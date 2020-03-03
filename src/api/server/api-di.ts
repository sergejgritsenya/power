import { PrismaClient } from "@prisma/client"
import { Container, interfaces } from "inversify"
import Router from "koa-router"
import { env, TEnv } from "./env"
import { PrismaService } from "./prisma-service"
import { AppRouter } from "./router"
import { appSymbols } from "./symbols"

const app_dependencies: interfaces.ServiceIdentifier<any>[] = [PrismaService]
const singletones: interfaces.ServiceIdentifier<any>[] = []
const routers: interfaces.ServiceIdentifier<any>[] = [AppRouter]

export type TApiDiInit = { container: Container; router: Router }
export class ApiDi {
  container = new Container()
  init = (): TApiDiInit => {
    this.bindAppDeps()
    const { app_router } = this.container.get(AppRouter)
    return { container: this.container, router: app_router }
  }
  private bindAppDeps = () => {
    app_dependencies.forEach(this.bindSingleton())
    singletones.forEach(this.bindSingleton())
    routers.forEach(router => this.container.bind(router).toSelf())
    const prisma: PrismaClient = this.container.get(PrismaService).prisma
    this.container.bind<PrismaClient>(appSymbols.prisma).toConstantValue(prisma)
    this.container.bind<TEnv>(appSymbols.env).toConstantValue(env)
  }
  private bindSingleton = () => (singleton: interfaces.ServiceIdentifier<any>) => {
    this.container
      .bind(singleton)
      .toSelf()
      .inSingletonScope()
  }
}

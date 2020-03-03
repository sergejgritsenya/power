import { PrismaClient } from "@prisma/client"
import { Container, interfaces } from "inversify"
import Router from "koa-router"
import { AdminRouter } from "./admin-router"
import { AppRouter } from "./app-router"
import { env, TEnv } from "./env"
import { PrismaService } from "./prisma-service"
import { appSymbols } from "./symbols"
import { WebRouter } from "./web-router"

const app_dependencies: interfaces.ServiceIdentifier<any>[] = [PrismaService]
const singletones: interfaces.ServiceIdentifier<any>[] = []
const routers: interfaces.ServiceIdentifier<any>[] = [AppRouter, AdminRouter, WebRouter]

export type TInitApiServerProps = { container: Container; router: Router }
export class ApiDiService {
  container = new Container()
  init = async (): Promise<TInitApiServerProps> => {
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

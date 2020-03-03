import { Container, interfaces } from "inversify"
import { env, TEnv } from "./env"
import { PrismaService } from "./prisma-service"
import { appSymbols } from "./symbols"

const app_dependencies: interfaces.ServiceIdentifier<any>[] = [PrismaService]
const routers: interfaces.ServiceIdentifier<any>[] = []
const singletones: interfaces.ServiceIdentifier<any>[] = []

export const bindAppDeps = (container: Container) => {
  container.bind<TEnv>(appSymbols.env).toConstantValue(env)
  app_dependencies.forEach(bindSingleton(container))
}

const bindSingleton = (container: Container) => (singleton: interfaces.ServiceIdentifier<any>) => {
  container
    .bind(singleton)
    .toSelf()
    .inSingletonScope()
}

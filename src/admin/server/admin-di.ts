import { Container, interfaces } from "inversify"
import { AdminSdk } from "../components/admin/admin-sdk"
import { AxiosService } from "./axios-service"

const singletons: interfaces.ServiceIdentifier<any>[] = [AxiosService, AdminSdk]
export class AdminContainer {
  container: Container = new Container()
  init = (): Container => {
    this.bindSingleton()
    return this.container
  }
  private bindSingleton = () => {
    singletons.forEach(singleton => {
      this.container
        .bind(singleton)
        .toSelf()
        .inSingletonScope()
    })
  }
}

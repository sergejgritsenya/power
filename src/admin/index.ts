import { Chyk, TLoadData } from "chyk"
import { createBrowserHistory } from "history"
import { Container } from "inversify"
import "reflect-metadata"
import { AdminRoot } from "./layout/root"
import { routes } from "./layout/routes"
import { SnackService } from "./layout/snack"
import { AdminContainer } from "./server/admin-di"

const history = createBrowserHistory()
const snackService = new SnackService()
const admin_di = new AdminContainer()
const container = admin_di.init()

new Chyk<TChykDeps>({
  routes,
  history,
  deps: { container, snackService },
  component: AdminRoot,
  el: document.getElementById("admin"),
})

type TChykDeps = {
  container: Container
  snackService: SnackService
}

export type TChykLoadData<T, M = any> = TLoadData<T, M, TChykDeps>

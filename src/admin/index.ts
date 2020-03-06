import { AxiosInstance } from "axios"
import { Chyk, TLoadData } from "chyk"
import { createBrowserHistory } from "history"
import { AdminRoot } from "./layout/root"
import { routes } from "./layout/routes"
import { SnackService } from "./layout/snack"
import { AdminContainer } from "./server/admin-di"
import { AxiosService } from "./server/axios-service"

const history = createBrowserHistory()
const snackService = new SnackService()
const admin_di = new AdminContainer()
const container = admin_di.init()
const axios = container.get(AxiosService).axios

type TChykDeps = {
  axios: AxiosInstance
  snackService: SnackService
}

new Chyk<TChykDeps>({
  routes,
  history,
  deps: { axios, snackService },
  component: AdminRoot,
  el: document.getElementById("admin"),
})

export type TChykLoadData<T, M = any> = TLoadData<T, M, TChykDeps>

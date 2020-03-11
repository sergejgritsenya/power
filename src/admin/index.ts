import { Chyk, TLoadData } from "chyk"
import { createBrowserHistory } from "history"
import { SnackService } from "../common/server/snack"
import { AdminRoot } from "./layout/admin-root"
import { routes } from "./layout/routes"
import { AuthController } from "./server/auth-controller"
import { AxiosService } from "./server/axios-service"

const history = createBrowserHistory()
const snackService = new SnackService()
const axios = new AxiosService()
const auth = new AuthController(axios)
new Chyk<TChykDeps>({
  routes,
  history,
  deps: { axios, auth, snackService },
  component: AdminRoot,
  el: document.getElementById("admin"),
  onLoadError: e => console.log(e),
})

export type TChykDeps = {
  axios: AxiosService
  auth: AuthController
  snackService: SnackService
}
export type TChykLoadData<T, M = any> = TLoadData<T, M, TChykDeps>

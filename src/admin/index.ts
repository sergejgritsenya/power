import { Chyk, TLoadData } from "chyk"
import { createBrowserHistory } from "history"
import { AdminRoot } from "./layout/root"
import { routes } from "./layout/routes"
import { SnackService } from "./layout/snack"
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

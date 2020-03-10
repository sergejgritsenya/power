import { Chyk, TLoadData } from "chyk"
import { createBrowserHistory } from "history"
import { admin_root_routes } from "../common/routes"
import { TAdmin } from "../common/types/admin-types"
import { AdminRoot } from "./layout/root"
import { routes } from "./layout/routes"
import { SnackService } from "./layout/snack"
import { AuthController } from "./server/auth-controller"
import { AxiosService } from "./server/axios-service"

const history = createBrowserHistory()
const snackService = new SnackService()
const axios = new AxiosService()
const getAdmin = async () => {
  return await axios.sendPost<TAdmin>({ route: admin_root_routes.admin_me })
}
const auth = new AuthController({ getAdmin })
axios.setAuthHeader(auth.getToken())
new Chyk<TChykDeps>({
  routes,
  history,
  deps: { axios, auth, snackService },
  component: AdminRoot,
  el: document.getElementById("admin"),
})

export type TChykDeps = {
  axios: AxiosService
  auth: AuthController
  snackService: SnackService
}
export type TChykLoadData<T, M = any> = TLoadData<T, M, TChykDeps>

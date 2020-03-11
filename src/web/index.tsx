import { Chyk, TLoadData } from "chyk"
import { createBrowserHistory } from "history"
import { SnackService } from "../common/server/snack"
import { routes } from "./layout/routes"
import { WebRoot } from "./layout/web-root"
import { AxiosService } from "./server/axios-service"

const history = createBrowserHistory()
const snackService = new SnackService()
const axios = new AxiosService()
new Chyk<TWebChykDeps>({
  routes,
  history,
  deps: { axios, snackService },
  component: WebRoot,
  el: document.getElementById("web"),
  onLoadError: e => console.log(e),
})

export type TWebChykDeps = {
  axios: AxiosService
  snackService: SnackService
}
export type TChykLoadData<T, M = any> = TLoadData<T, M, TWebChykDeps>

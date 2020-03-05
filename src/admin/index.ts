import { AxiosInstance } from "axios"
import { Chyk, TLoadData } from "chyk"
import { createBrowserHistory } from "history"
import { AdminRoot } from "./layout/root"
import { routes } from "./layout/routes"
import { SnackService } from "./layout/snack"
import { AxiosService } from "./server/axios-service"

const history = createBrowserHistory()
const snackService = new SnackService()
const axios_service = new AxiosService()
const axios = axios_service.axios

new Chyk<TChykDeps>({
  routes,
  history,
  deps: { axios, snackService },
  component: AdminRoot,
  el: document.getElementById("admin"),
})

type TChykDeps = {
  axios: AxiosInstance
  snackService: SnackService
}

export type TChykLoadData<T, M = any> = TLoadData<T, M, TChykDeps>

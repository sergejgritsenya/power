import { AxiosInstance } from "axios"
import { Chyk, TLoadData } from "chyk"
import { createBrowserHistory } from "history"
import { AdminRoot } from "./layout/root"
import { routes } from "./layout/routes"
import { AxiosService } from "./server/axios-service"

const history = createBrowserHistory()
const axios_service = new AxiosService()
const axios = axios_service.axios

new Chyk<TChykDeps>({
  routes,
  history,
  deps: { axios },
  component: AdminRoot,
  el: document.getElementById("admin"),
})

type TChykDeps = {
  axios: AxiosInstance
}

export type TChykLoadData<T, M = any> = TLoadData<T, M, TChykDeps>

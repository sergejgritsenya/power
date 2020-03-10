import { admin_auth_routes, admin_root_routes } from "../../common/routes"
import { TAdmin } from "../../common/types/admin-types"
import { EAuthStorageKey, TAuth } from "../../common/types/auth-types"
import { AxiosService } from "./axios-service"

export class AuthController {
  private access_token: string
  private refresh_token: string
  private admin: TAdmin | null = null
  private axios: AxiosService
  constructor(axiosService: AxiosService) {
    this.access_token = localStorage.getItem(EAuthStorageKey.admin) || ""
    this.refresh_token = localStorage.getItem(EAuthStorageKey.admin_refresh) || ""
    this.axios = axiosService
    this.axios.setAuthHeader(this.getToken())
  }
  get loaded(): boolean {
    return this.admin !== null
  }
  getToken = () => this.access_token
  getAdmin = async () => {
    const res = await this.axios.sendPost<TAdmin>({ route: admin_root_routes.admin_me })
    this.admin = res.data
    return res
  }
  getRefreshToken = () => this.refresh_token
  setTokens = (tokens: TAuth) => {
    this.access_token = tokens.access_token
    this.refresh_token = tokens.refresh_token
    this.axios.setAuthHeader(this.getToken())
    localStorage.setItem(EAuthStorageKey.admin, tokens.access_token)
    localStorage.setItem(EAuthStorageKey.admin_refresh, tokens.refresh_token)
  }
  logout = () => {
    this.admin = null
    this.setTokens({ access_token: "", refresh_token: "" })
    window.location.reload()
  }
  refresh = async () => {
    const res = await this.axios.sendPost<TAuth>({
      route: admin_auth_routes.refresh,
      data: { refresh_token: this.getRefreshToken() },
    })
    this.setTokens({ access_token: res.data.access_token, refresh_token: res.data.refresh_token })
  }
}

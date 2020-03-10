import { AxiosResponse } from "axios"
import { TAdmin } from "../../common/types/admin-types"
import { EAuthStorageKey, TAuth } from "../../common/types/auth-types"

type TAuthControllerProps = {
  getAdmin: () => Promise<AxiosResponse<TAdmin>>
}
export class AuthController {
  private access_token: string
  private refresh_token: string
  private admin: TAdmin | null = null
  constructor(props: TAuthControllerProps) {
    this.access_token = localStorage.getItem(EAuthStorageKey.admin) || ""
    this.refresh_token = localStorage.getItem(EAuthStorageKey.admin_refresh) || ""
    this.getAdmin = () => props.getAdmin()
  }
  get loaded(): boolean {
    console.log(this.admin)
    return this.admin !== null
  }
  getToken = () => this.access_token
  getAdmin: () => Promise<AxiosResponse<TAdmin>>
  getRefreshToken = () => this.refresh_token
  setTokens = (tokens: TAuth) => {
    this.access_token = tokens.access_token
    this.refresh_token = tokens.refresh_token
    localStorage.setItem(EAuthStorageKey.admin, tokens.access_token)
    localStorage.setItem(EAuthStorageKey.admin_refresh, tokens.refresh_token)
  }
  logout = () => {
    this.admin = null
  }
  clean = () => {
    this.access_token = ""
    this.refresh_token = ""
  }
}

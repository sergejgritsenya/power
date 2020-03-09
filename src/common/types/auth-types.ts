import { TAdmin } from "./admin-types"

export enum EAuthKey {
  admin = "power-auth-token-admin",
}

export type TAuth = {
  token: string
  refresh_token: string
  admin: TAdmin
}
export type TAuthProps = {
  login: string
  password: string
}

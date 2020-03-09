export enum EAuthKey {
  admin = "power-auth-token-admin",
}

export type TAuth = {
  access_token: string
  refresh_token: string
}
export type TAuthProps = {
  login: string
  password: string
}

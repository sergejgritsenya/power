export type TAdminList = {
  id: string
  login: string
  email: string
}
export type TAdmin = {
  id: string
  login: string
  email: string
}
export type TAdminCreateProps = {
  login: string
  email: string
  password: string
  confirm_password: string
}
export type TAdminUpdateProps = {
  login: string
  email: string
}

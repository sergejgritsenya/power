export type TAdminList = {
  id: string
  name: string
  email: string
}
export type TAdmin = {
  id: string
  name: string
  email: string
}
export type TAdminCreateProps = {
  name: string
  email: string
  password: string
  confirm_password: string
}
export type TAdminUpdateProps = {
  name: string
  email: string
}

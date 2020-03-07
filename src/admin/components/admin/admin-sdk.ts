import { AxiosInstance } from "axios"
import { admin_root_routes, admin_routes, frontRoute } from "../../../common/routes"
import {
  TAdmin,
  TAdminCreateProps,
  TAdminList,
  TAdminUpdateProps,
} from "../../../common/types/admin-types"

export const adminList = async (axios: AxiosInstance) => {
  return await axios.post<TAdminList[]>(admin_root_routes.list)
}
export const adminGet = async (axios: AxiosInstance, admin_id: string) => {
  return await axios.post<TAdmin>(frontRoute(admin_routes.get, { admin_id }))
}
export const adminCreate = async (axios: AxiosInstance, data: TAdminCreateProps) => {
  return await axios.post<string>(admin_root_routes.create, data)
}
export const adminUpdate = async (
  axios: AxiosInstance,
  admin_id: string,
  data: TAdminUpdateProps
) => {
  return await axios.post<TAdmin>(frontRoute(admin_routes.update, { admin_id }), data)
}
export const deleteAdmin = async (axios: AxiosInstance, admin_id: string) => {
  return await axios.post<TAdminList[]>(admin_root_routes.delete, { admin_id })
}

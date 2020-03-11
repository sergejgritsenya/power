import { admin_auth_routes, admin_root_routes } from "../../../common/routes"
import { TAdminChangePasswordProps, TAdminUpdateProps } from "../../../common/types/admin-types"
import { TAuthProps } from "../../../common/types/auth-types"
import { TAxiosSendProps } from "../../../common/types/common-types"

export const adminLogin = (data: TAuthProps): TAxiosSendProps => ({
  route: admin_auth_routes.login,
  data,
})
export const adminUpdate = (data: TAdminUpdateProps): TAxiosSendProps => ({
  route: admin_root_routes.update,
  data,
})
export const adminChangePassword = (data: TAdminChangePasswordProps): TAxiosSendProps => ({
  route: admin_root_routes.change_pass,
  data,
})

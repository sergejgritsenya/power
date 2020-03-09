import { admin_auth_routes } from "../../../common/routes"
import { TAuthProps } from "../../../common/types/auth-types"
import { TAxiosSendProps } from "../../../common/types/common-types"

export const adminLogin = (data: TAuthProps): TAxiosSendProps => ({
  route: admin_auth_routes.login,
  data,
})

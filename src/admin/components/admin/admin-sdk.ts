import { admin_root_routes, admin_routes, frontRoute } from "../../../common/routes"
import { TAdminCreateProps } from "../../../common/types/admin-types"
import { TAxiosSendProps } from "../../../common/types/common-types"

export const adminList = (): TAxiosSendProps => ({
  route: admin_root_routes.list,
})

export const adminGet = (admin_id: string): TAxiosSendProps => ({
  route: frontRoute(admin_routes.get, { admin_id }),
})

export const adminCreate = (data: TAdminCreateProps): TAxiosSendProps => ({
  route: admin_root_routes.create,
  data,
})

export const adminDelete = (admin_id: string): TAxiosSendProps => ({
  route: admin_root_routes.delete,
  data: { admin_id },
})

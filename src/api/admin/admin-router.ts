import { inject, injectable } from "inversify"
import { admin_root_routes, admin_routes } from "../../common/routes"
import { TAdminCreateProps } from "../../common/types/admin-types"
import { ApiAuthRouter } from "../server/context"
import { AdminService } from "./admin-service"

@injectable()
export class AdminRouter {
  admin_router = new ApiAuthRouter()
  constructor(@inject(AdminService) private readonly adminService: AdminService) {
    this.admin_router.post(admin_root_routes.list, async ctx => {
      ctx.body = await this.adminService.list()
    })
    this.admin_router.post(admin_root_routes.create, async ctx => {
      const data = ctx.request.body as TAdminCreateProps
      ctx.body = await this.adminService.create(data)
    })
    this.admin_router.post(admin_root_routes.delete, async ctx => {
      const { admin_id } = ctx.request.body as { admin_id: string }
      ctx.body = await this.adminService.deleteAdmin(admin_id)
    })
    this.admin_router.post(admin_routes.get, async ctx => {
      const admin_id = ctx.params.admin_id
      ctx.body = await this.adminService.getAdmin(admin_id)
    })
    this.admin_router.post(admin_root_routes.admin_me, async ctx => {
      try {
        const admin_id = ctx.admin_id
        if (admin_id) {
          ctx.body = await this.adminService.getAdmin(admin_id)
        } else {
          ctx.status = 401
        }
      } catch (e) {
        ctx.status = 401
      }
    })
  }
}

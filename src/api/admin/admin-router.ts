import Router = require("koa-router")
import { inject, injectable } from "inversify"
import { admin_root_routes, admin_routes } from "../../common/routes"
import { TAdminCreateProps, TAdminUpdateProps } from "../../common/types/admin-types"
import { AdminService } from "./admin-service"

@injectable()
export class AdminRouter {
  admin_router = new Router()
  constructor(@inject(AdminService) private readonly admin_service: AdminService) {
    this.admin_router.post(admin_root_routes.list, async ctx => {
      ctx.body = await this.admin_service.list()
    })
    this.admin_router.post(admin_root_routes.create, async ctx => {
      const data = ctx.request.body as TAdminCreateProps
      ctx.body = await admin_service.create(data)
    })
    this.admin_router.post(admin_root_routes.delete, async ctx => {
      const { admin_id } = ctx.request.body as { admin_id: string }
      ctx.body = await admin_service.deleteAdmin(admin_id)
    })
    this.admin_router.post(admin_routes.get, async ctx => {
      const admin_id = ctx.params.admin_id
      ctx.body = await this.admin_service.getAdmin(admin_id)
    })
    this.admin_router.post(admin_routes.update, async ctx => {
      const admin_id = ctx.params.admin_id
      const data = ctx.request.body as TAdminUpdateProps
      ctx.body = await admin_service.update(admin_id, data)
    })
  }
}

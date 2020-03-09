import { inject, injectable } from "inversify"
import { admin_auth_routes } from "../../common/routes"
import { TAuthProps } from "../../common/types/auth-types"
import { AdminService } from "../admin/admin-service"
import { AuthService } from "./auth-service"
import Router = require("koa-router")

@injectable()
export class AuthRouter {
  auth_router = new Router()
  constructor(
    @inject(AuthService) private readonly authService: AuthService,
    @inject(AdminService) private readonly adminService: AdminService
  ) {
    this.auth_router.post(admin_auth_routes.login, async ctx => {
      const auth_props = ctx.request.body as TAuthProps
      try {
        ctx.body = await this.authService.adminLogin(auth_props)
        ctx.status = 200
      } catch (e) {
        ctx.status = 401
      }
    })
    this.auth_router.post(admin_auth_routes.admin_me, async ctx => {
      try {
        const admin_id = ctx.admin_id
        ctx.body = await this.adminService.getAdmin(admin_id)
        ctx.status = 200
      } catch (e) {
        ctx.status = 401
      }
    })
  }
}

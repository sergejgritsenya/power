import { inject, injectable } from "inversify"
import { Middleware } from "koa"
import Router from "koa-router"
import { AdminRouter } from "../admin/admin-router"

@injectable()
export class AdminApiRouter {
  admin_api_router = new Router()
  constructor(@inject(AdminRouter) private readonly adminRouter: AdminRouter) {
    this.admin_api_router.use(
      this.adminRouter.admin_router.routes() as Middleware,
      this.adminRouter.admin_router.allowedMethods() as Middleware
    )
  }
}

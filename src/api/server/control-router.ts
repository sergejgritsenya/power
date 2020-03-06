import { inject, injectable } from "inversify"
import { Middleware } from "koa"
import Router from "koa-router"
import { AdminRouter } from "../admin/admin-router"

@injectable()
export class ControlRouter {
  control_router = new Router()
  constructor(@inject(AdminRouter) private readonly adminRouter: AdminRouter) {
    this.control_router.use(
      this.adminRouter.admin_router.routes() as Middleware,
      this.adminRouter.admin_router.allowedMethods() as Middleware
    )
  }
}

import { inject, injectable } from "inversify"
import { Middleware } from "koa"
import Router from "koa-router"
import { AdminRouter } from "./admin-router"
import { WebRouter } from "./web-router"

@injectable()
export class AppRouter {
  app_router = new Router()
  admin_router: Router
  web_router: Router
  constructor(
    @inject(AdminRouter) private readonly adminRouter: AdminRouter,
    @inject(WebRouter) private readonly webRouter: WebRouter
  ) {
    this.admin_router = this.adminRouter.admin_router
    this.web_router = this.webRouter.web_router
    this.app_router.use(
      "/admin*",
      this.admin_router.routes() as Middleware,
      this.admin_router.allowedMethods() as Middleware
    )
    this.app_router.use(
      "/*",
      this.web_router.routes() as Middleware,
      this.web_router.allowedMethods() as Middleware
    )
  }
}

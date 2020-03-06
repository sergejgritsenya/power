import { inject, injectable } from "inversify"
import { Middleware } from "koa"
import Router from "koa-router"
import { ControlRouter } from "./control-router"
import { WebRouter } from "./web-router"

@injectable()
export class AppRouter {
  app_router = new Router()
  admin_api_router: Router
  web_router: Router
  constructor(
    @inject(ControlRouter) private readonly adminApiRouter: ControlRouter,
    @inject(WebRouter) private readonly webRouter: WebRouter
  ) {
    this.admin_api_router = this.adminApiRouter.control_router
    this.web_router = this.webRouter.web_router
    this.app_router.use(
      this.admin_api_router.routes() as Middleware,
      this.admin_api_router.allowedMethods() as Middleware
    )
    this.app_router.use(
      this.web_router.routes() as Middleware,
      this.web_router.allowedMethods() as Middleware
    )
  }
}

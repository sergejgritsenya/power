import { injectable } from "inversify"
import Router from "koa-router"

@injectable()
export class AdminRouter {
  admin_router = new Router()
  constructor() {
    this.admin_router.get("*", async ctx => {
      ctx.status = 200
    })
  }
}

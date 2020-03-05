import { injectable } from "inversify"
import Router from "koa-router"
import { adminTemplate } from "../../admin/server/template"

@injectable()
export class AdminRouter {
  admin_router = new Router()
  constructor() {
    this.admin_router.use(async ctx => {
      ctx.body = await adminTemplate()
    })
    this.admin_router.get("*", async ctx => {
      ctx.body = "TEST GET"
      ctx.status = 200
    })
    this.admin_router.post("*", async ctx => {
      ctx.body = "TEST POST"
      ctx.status = 200
    })
  }
}

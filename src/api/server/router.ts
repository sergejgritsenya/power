import Router from "koa-router"
import { adminTemplate, webTemplate } from "./template"

export class AppRouter {
  app_router = new Router()
  constructor() {
    // this.app_router.use("/admin/*")
    this.app_router.get("/admin*", async ctx => {
      ctx.body = await adminTemplate()
    })
    this.app_router.get("/*", async ctx => {
      ctx.body = await webTemplate()
    })
  }
}

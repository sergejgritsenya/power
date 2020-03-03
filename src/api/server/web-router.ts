import { injectable } from "inversify"
import Router from "koa-router"
import { webTemplate } from "./template"

@injectable()
export class WebRouter {
  web_router = new Router()
  constructor() {
    this.web_router.get("*", async ctx => {
      ctx.body = await webTemplate()
    })
  }
}

import Koa from "koa"
import { Env } from "./env"
import { adminTemplate } from "./template"

const api_port = Env.API_PORT
const api_server = new Koa()

api_server.use(async ctx => {
  ctx.body = await adminTemplate()
})
api_server.listen(api_port, () => console.log(`API server start on: http://localhost:${api_port}`))

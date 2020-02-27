import Koa from "koa"
import { template } from "./template"

const api_port = process.env.API_PORT || 3000
const api_server = new Koa()

api_server.use(async ctx => {
  ctx.body = await template()
})
api_server.listen(api_port, () => console.log(`API server start on: http://localhost:${api_port}`))

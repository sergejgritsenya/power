import Koa from "koa"
import { adminTemplate } from "./template"

const adminServerInit = async () => {
  const admin_port = process.env.ADMIN_PORT || 3087
  const admin_server = new Koa()
  admin_server.use(async ctx => {
    ctx.body = await adminTemplate()
  })
  admin_server.listen(admin_port, () =>
    console.log(`Admin server start on: http://localhost:${admin_port}`)
  )
}
adminServerInit()

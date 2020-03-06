import Koa from "koa"
import { errorMiddleware, koaOnError } from "../../common/server/middleware"
import { spa_middleware } from "./admin-middleware"

const admin_port = process.env.ADMIN_PORT || 3087
const admin_server = new Koa()

admin_server.use(errorMiddleware)
admin_server.use(spa_middleware)
admin_server.on("error", koaOnError)
admin_server.listen(admin_port, () =>
  console.log(`Admin server start on: http://localhost:${admin_port}`)
)

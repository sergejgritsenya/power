import Koa from "koa"
import serve from "koa-static"
import { resolve } from "path"
import { errorMiddleware, koaOnError } from "../../common/server/middleware"
import { spa_middleware } from "./admin-middleware"
import { adminEnv } from "./env"

const admin_port = adminEnv.ADMIN_PORT
const admin_server = new Koa()
const PUBLIC_DIR_PATH = resolve(process.cwd(), "public")

admin_server.use(errorMiddleware)
admin_server.use(serve(PUBLIC_DIR_PATH))
admin_server.use(spa_middleware)
admin_server.on("error", koaOnError)
admin_server.listen(admin_port, () =>
  console.log(`Admin server start on: http://localhost:${admin_port}`)
)

import Koa from "koa"
import { errorMiddleware, koaOnError } from "../../common/server/middleware"
import { webEnv } from "./web-env"
import { spa_middleware } from "./web-middleware"

const web_port = webEnv.WEB_PORT
const web_server = new Koa()

web_server.use(errorMiddleware)
web_server.use(spa_middleware)
web_server.on("error", koaOnError)
web_server.listen(web_port, () => console.log(`Web server start on: http://localhost:${web_port}`))

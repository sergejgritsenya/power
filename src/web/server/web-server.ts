import Koa from "koa"
import serve from "koa-static"
import { resolve } from "path"
import { errorMiddleware, koaOnError } from "../../common/server/middleware"
import { webEnv } from "./web-env"
import { spa_middleware } from "./web-middleware"

const web_port = webEnv.WEB_PORT
const web_server = new Koa()
const PUBLIC_FOLDER_PATH = resolve(process.cwd(), "public")
web_server.use(errorMiddleware)
web_server.use(serve(PUBLIC_FOLDER_PATH, { maxage: 31536000 })) // year 1000 * 60 * 60 * 24 * 30 * 365
web_server.use(spa_middleware)
web_server.on("error", koaOnError)
web_server.listen(web_port, () => console.log(`Web server start on: http://localhost:${web_port}`))

import Koa from "koa"
import { Env } from "./env"
import { AppRouter } from "./router"

const api_port = Env.API_PORT
const api_server = new Koa()
const app_router = new AppRouter()

api_server.use(app_router.app_router.routes()).use(app_router.app_router.allowedMethods())
api_server.listen(api_port, () => console.log(`API server start on: http://localhost:${api_port}`))

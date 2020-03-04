import Koa from "koa"
import { ApiDiService, TInitApiServerProps } from "./api-di"
import { TEnv } from "./env"
import { appSymbols } from "./symbols"

const initApiServer = (props: TInitApiServerProps) => {
  const api_server = new Koa()
  api_server.context.ioc = props.container
  api_server.use(props.router.routes()).use(props.router.allowedMethods())
  const env: TEnv = props.container.get(appSymbols.env)
  const api_port = env.API_PORT
  api_server.listen(api_port, () =>
    console.log(`API server start on: http://localhost:${api_port}`)
  )
}

const api_di = new ApiDiService()
api_di.init().then(initApiServer)

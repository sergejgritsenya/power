import { getEntryAssetsScripts } from "chyk"
import { Middleware } from "koa"
import { getManifest, PUBLIC_OUTPUT_PATH } from "../../common/config"
import { adminEnv } from "./env"

let scripts: string = ""
export const spa_middleware: Middleware = async (ctx, next) => {
  if (!adminEnv.IS_PROD || !scripts) {
    const manifest = await getManifest()
    scripts = getEntryAssetsScripts(PUBLIC_OUTPUT_PATH, manifest.entrypoints.admin.js)
  }
  ctx.statusCode = 200
  const r = template({ scripts })
  ctx.body = r
  await next()
}

type TTemplateProps = { scripts: string }
const template = (props: TTemplateProps) => `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>P.O.W.E.R. ADMIN</title>
</head>
<body>
  <div id="admin"></div>
  ${props.scripts}
</body>
</html>`

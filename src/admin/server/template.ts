import { api_env } from "../../api/server/env"

const { WDS_PORT } = api_env

export const adminTemplate = async (): Promise<string> => {
  const ASSETS_URL = WDS_PORT ? `http://localhost:${WDS_PORT}/admin.js` : "/dist/admin.js"
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>P.O.W.E.R. ADMIN</title>
    </head>
    <body>
      <div id="admin"></div>
      <script src="${ASSETS_URL}"></script>
    </body>
  </html>
  `
}

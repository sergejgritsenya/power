import { env } from "../../api/server/env"

const { WDS_PORT } = env

export const adminTemplate = async (): Promise<string> => `
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
      <script src="http://localhost:${WDS_PORT}/admin.js"></script>
    </body>
  </html>
  `

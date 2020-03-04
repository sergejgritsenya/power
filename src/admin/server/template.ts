import { env } from "../../api/server/env"

const { WDS_PORT } = env

export const adminTemplate = async (): Promise<string> => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf8" />
      <title>P.O.W.E.R. ADMIN</title>
    </head>
    <body>
      <div id="admin"></div>
      <script src="http://localhost:${WDS_PORT}/admin.js"></script>
    </body>
  </html>
  `

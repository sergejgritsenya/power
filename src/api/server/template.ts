import { api_env } from "./env"

const { WDS_PORT } = api_env

export const webTemplate = async (): Promise<string> => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf8" />
      <title>P.O.W.E.R.</title>
    </head>
    <body>
      <div id="app"></div>
      <script src="http://localhost:${WDS_PORT}/web.js"></script>
    </body>
  </html>
  `

import { Env } from "./env"

const { WDS_PORT } = Env
export const adminTemplate = async (): Promise<string> => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf8" />
      <title>Admin P.O.W.E.R.</title>
    </head>
    <body>
      <div id="admin"></div>
      <script src="http://localhost:${WDS_PORT}/admin.js"></script>
    </body>
  </html>
  `

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

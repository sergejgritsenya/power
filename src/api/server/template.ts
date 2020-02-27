export const template = async (): Promise<string> => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf8" />
      <title>Admin POWER</title>
    </head>
    <body>
      <div id="admin"></div>
      <script src="http://localhost:8080/bundle.js"></script>
    </body>
  </html>
  `
}

import { CssBaseline, ThemeProvider } from "@material-ui/core"
import React, { FC } from "react"
import { render } from "react-dom"
import { AdminContainer } from "../server/admin-di"
import { AdminApp } from "./admin-app"
import { DiContextProvider } from "./di-context"
import { getTheme } from "./theme"

const AdminRoot: FC = () => {
  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      <AdminApp />
    </ThemeProvider>
  )
}
const admin_container = new AdminContainer()
const container = admin_container.init()
const admin_id = document.getElementById("admin")
render(
  <DiContextProvider value={container}>
    <AdminRoot />
  </DiContextProvider>,
  admin_id
)

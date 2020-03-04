import { CssBaseline, ThemeProvider } from "@material-ui/core"
import React, { FC } from "react"
import { render } from "react-dom"
import { AdminApp } from "./admin-app"
import { getTheme } from "./theme"

const AdminRoot: FC = () => (
  <ThemeProvider theme={getTheme()}>
    <CssBaseline />
    <AdminApp />
  </ThemeProvider>
)

const admin_id = document.getElementById("admin")
render(<AdminRoot />, admin_id)

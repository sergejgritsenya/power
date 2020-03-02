import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { createBrowserHistory } from "history"
import React, { FC } from "react"
import { render } from "react-dom"
import { Router } from "react-router-dom"
import { AdminLayot } from "./layout"
import { getTheme } from "./theme"

const history = createBrowserHistory()
const AdminRoot: FC = () => {
  return (
    <>
      <ThemeProvider theme={getTheme()}>
        <CssBaseline />
        <Router history={history}>
          <AdminLayot />
        </Router>
      </ThemeProvider>
    </>
  )
}
const admin_id = document.getElementById("admin")
render(<AdminRoot />, admin_id)

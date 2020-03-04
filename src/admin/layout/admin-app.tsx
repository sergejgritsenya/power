import { createStyles, makeStyles } from "@material-ui/styles"
import { createBrowserHistory } from "history"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { Router } from "react-router-dom"
import { AdminHeader } from "./header"
import { AdminMain } from "./main"
import { AdminNavBar } from "./nav-bar"

export const AdminApp: FC = () => {
  const history = createBrowserHistory()
  const classes = useStyles()
  return useObserver(() => (
    <Router history={history}>
      <div className={classes.root}>
        <AdminHeader />
        <div className={classes.flex}>
          <AdminNavBar />
          <AdminMain />
        </div>
      </div>
    </Router>
  ))
}

const useStyles = makeStyles(
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    flex: {
      display: "flex",
      flexGrow: 1,
    },
  })
)

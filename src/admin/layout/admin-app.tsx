import { createStyles, makeStyles } from "@material-ui/styles"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { AdminMain } from "./admin-main"
import { AdminHeader } from "./header"
import { NavBar } from "./nav-bar"

export const AdminApp: FC = () => {
  const classes = useStyles()
  return useObserver(() => (
    <div className={classes.root}>
      <AdminHeader />
      <div className={classes.flex}>
        <NavBar />
        <AdminMain />
      </div>
    </div>
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

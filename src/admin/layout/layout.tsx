import { Card, CardContent } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/styles"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { AdminHeader } from "./header"
import { NavBar } from "./nav-bar"

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
      background: "#1c3780",
    },
    main: {
      flexGrow: 1,
      overflow: "scroll",
      background: "#fafafa",
    },
  })
)
export const AdminLayot: FC = () => {
  const classes = useStyles()
  return useObserver(() => (
    <div className={classes.root}>
      <AdminHeader />
      <div className={classes.flex}>
        <NavBar />
        <main className={classes.main}>
          <Card>
            <CardContent>
              <h1>Hello POWER ADMIN</h1>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  ))
}

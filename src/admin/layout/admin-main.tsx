import { createStyles, makeStyles } from "@material-ui/core"
import React, { FC } from "react"
import { Route, Switch } from "react-router-dom"
import { AdminAccount } from "../account/account"
import { AdminList } from "../admin/admin-list"
import { TournamentList } from "../tournament/tournament-list"

export const AdminMain: FC = () => {
  const classes = useStyles()
  return (
    <main className={classes.root}>
      <Switch>
        <Route exact path="/" component={AdminAccount}></Route>
        <Route path="/admins" component={AdminList}></Route>
        <Route path="/tournaments" component={TournamentList}></Route>
      </Switch>
    </main>
  )
}

const useStyles = makeStyles(
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "auto",
      background: "#fafafa",
      maxWidth: "1280px",
      width: "100%",
      margin: "0 auto",
      padding: "24px 24px",
    },
  })
)

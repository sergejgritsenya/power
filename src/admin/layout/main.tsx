import { createStyles, makeStyles } from "@material-ui/core"
import React, { FC } from "react"
import { Route, Switch } from "react-router-dom"
import { AdminAccount } from "../components/account/account"
import { AdminLoader } from "../components/admin/admin"
import { AdminList } from "../components/admin/admin-list"
import { Tournament } from "../components/tournament/tournament"
import { TournamentList } from "../components/tournament/tournament-list"

export const AdminMain: FC = () => {
  const classes = useStyles()
  return (
    <main className={classes.root}>
      <Switch>
        <Route exact path="/" component={AdminAccount}></Route>
        <Route exact path="/admins" component={AdminList}></Route>
        <Route path="/admins/:admin_id" component={AdminLoader}></Route>
        <Route exact path="/tournaments" component={TournamentList}></Route>
        <Route path="/tournaments/:tournament_id" component={Tournament}></Route>
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

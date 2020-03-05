import { createStyles, makeStyles } from "@material-ui/styles"
import { TRouteComponentProps } from "chyk"
import { createBrowserHistory } from "history"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { Router } from "react-router-dom"
import { TChykLoadData } from ".."
import { AdminHeader } from "./header"
import { AdminMain } from "./main"
import { AdminNavBar } from "./nav-bar"

type TAdminAppData = {}
export const adminAppLoader: TChykLoadData<TAdminAppData> = async (_, { axios }) => ({})

type TAdminAppProps = TRouteComponentProps<TAdminAppData>
export const AdminApp: FC<TAdminAppProps> = ({ route }) => {
  const history = createBrowserHistory()
  const classes = useStyles()
  return useObserver(() => (
    <Router history={history}>
      <div className={classes.root}>
        <AdminHeader />
        <div className={classes.flex}>
          <AdminNavBar />
          <AdminMain route={route} />
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

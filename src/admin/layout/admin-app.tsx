import { createStyles, makeStyles } from "@material-ui/styles"
import { TRouteComponentProps } from "chyk"
import React, { FC, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { TChykLoadData } from ".."
import { useAuth } from "./di-context"
import { AdminHeader } from "./header"
import { AdminMain } from "./main"
import { AdminNavBar } from "./nav-bar"

type TAdminAppData = {}
export const adminAppLoader: TChykLoadData<TAdminAppData> = async (_, { auth }) => {
  console.log("2222222", auth.getToken() && !auth.loaded)
  auth.getToken() && !auth.loaded ? await auth.getAdmin() : null
  console.log("333333")
  return {}
}

type TAdminAppProps = TRouteComponentProps<TAdminAppData>
export const AdminApp: FC<TAdminAppProps> = ({ route }) => {
  console.log("!!!!!!!")
  const auth = useAuth()
  const history = useHistory()
  const classes = useStyles()
  useEffect(() => {
    if (!auth.loaded) {
      history.replace("/login", { redirect_location: history.location })
    }
  }, [])
  if (!auth.loaded) {
    return null
  }
  return (
    <div className={classes.root}>
      <AdminHeader />
      <div className={classes.flex}>
        <AdminNavBar />
        <AdminMain route={route} />
      </div>
    </div>
  )
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

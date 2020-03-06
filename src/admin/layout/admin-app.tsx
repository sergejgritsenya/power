import { createStyles, makeStyles } from "@material-ui/styles"
import { TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { TChykLoadData } from ".."
import { AdminHeader } from "./header"
import { AdminMain } from "./main"
import { AdminNavBar } from "./nav-bar"

type TAdminAppData = {}
export const adminAppLoader: TChykLoadData<TAdminAppData> = async (_, {}) => ({})

type TAdminAppProps = TRouteComponentProps<TAdminAppData>
export const AdminApp: FC<TAdminAppProps> = ({ route }) => {
  const classes = useStyles()
  return useObserver(() => (
    <div className={classes.root}>
      <AdminHeader />
      <div className={classes.flex}>
        <AdminNavBar />
        <AdminMain route={route} />
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

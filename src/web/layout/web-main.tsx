import { makeStyles } from "@material-ui/core"
import { DataRoutes, TRouteConfig } from "chyk"
import React, { FC } from "react"
import { PageInner } from "../components/common/page-inner"
import { NotFound } from "./not-found"

type TWebMainProps = {
  route: TRouteConfig
}
export const WebMain: FC<TWebMainProps> = ({ route }) => {
  const classes = useStyles()
  return (
    <PageInner className={classes.root} component="main">
      {route.routes ? <DataRoutes routes={route.routes} /> : <NotFound />}
    </PageInner>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh - 110px - 100px)",
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(100vh - 231px - 100px)",
    },
  },
}))

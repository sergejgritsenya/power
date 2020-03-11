import { createStyles, makeStyles } from "@material-ui/core"
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

const useStyles = makeStyles(
  createStyles({
    root: {
      minHeight: "calc(100vh - 100px)",
      display: "flex",
      flexDirection: "column",
    },
  })
)

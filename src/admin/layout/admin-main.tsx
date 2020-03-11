import { Container, makeStyles } from "@material-ui/core"
import { DataRoutes, TRouteConfig } from "chyk"
import React, { FC } from "react"
import { NotFound } from "./not-found"

type TAdminMainProps = {
  route: TRouteConfig
}
export const AdminMain: FC<TAdminMainProps> = ({ route }) => {
  const classes = useStyles()
  return (
    <main className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        {route.routes ? <DataRoutes routes={route.routes} /> : <NotFound />}
      </Container>
    </main>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "auto",
    background: "#fafafa",
    maxWidth: "1280px",
    width: "100%",
    margin: "0 auto",
    padding: "24px 24px",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

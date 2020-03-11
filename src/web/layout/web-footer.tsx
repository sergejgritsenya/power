import { makeStyles } from "@material-ui/core"
import React, { FC } from "react"
import { PageInner } from "../components/common/page-inner"

export const WebFooter: FC = () => {
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <PageInner>footer</PageInner>
    </footer>
  )
}
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      position: "relative",
    },
  },
  root: {
    background: theme.palette.primary.dark,
    height: "50px",
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
  },
}))

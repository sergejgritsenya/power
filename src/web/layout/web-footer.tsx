import { makeStyles } from "@material-ui/core"
import React, { FC } from "react"

export const WebFooter: FC = () => {
  const classes = useStyles()
  return <footer className={classes.root}>fff</footer>
}
const useStyles = makeStyles(_theme => ({
  "@global": {
    body: {
      position: "relative",
    },
  },
  root: {
    background: "blue",
    height: "50px",
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
  },
}))

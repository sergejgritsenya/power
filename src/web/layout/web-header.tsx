import { makeStyles } from "@material-ui/core"
import React, { FC } from "react"
import { PageInner } from "../el/page-inner"

export const WebHeader: FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.stub} />
      <header className={classes.root}>
        <PageInner>header</PageInner>
      </header>
    </>
  )
}

const useStyles = makeStyles(_theme => ({
  root: {
    background: "red",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100px",
  },
  stub: {
    height: "100px",
    width: "1px",
  },
}))

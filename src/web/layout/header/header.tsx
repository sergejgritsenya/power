import { makeStyles } from "@material-ui/core"
import React, { FC } from "react"
import { PageInner } from "../../components/common/page-inner"
import { HeaderLogo } from "./header-logo"
import { HeaderMenu } from "./header-menu"

export const WebHeader: FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.stub} />
      <header className={classes.root}>
        <PageInner>
          <div className={classes.left}>
            <HeaderLogo />
            <HeaderMenu />
          </div>
        </PageInner>
      </header>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  stub: {
    height: "100px",
    width: "1px",
  },
}))

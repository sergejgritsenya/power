import { makeStyles } from "@material-ui/core"
import clsx from "clsx"
import React, { FC } from "react"
import { PageInner } from "../../components/common/page-inner"
import { HeaderMenu } from "./header-menu"

export const WebHeader: FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.size} />
      <header className={clsx(classes.root, classes.size)}>
        <PageInner>
          <div className={classes.left}>
            {/* <HeaderLogo /> */}
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
    zIndex: 10,
  },
  left: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  size: {
    height: "100px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      height: "220px",
    },
  },
}))

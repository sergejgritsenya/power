import { makeStyles } from "@material-ui/core"
import React, { FC } from "react"
import { HeaderMenuItem } from "./header-item"

export const HeaderMenu: FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <HeaderMenuItem label="P.O.W.E.R" link="/"></HeaderMenuItem>
      <HeaderMenuItem label="News" link="/news"></HeaderMenuItem>
      <HeaderMenuItem label="Tournaments" link="/tournaments"></HeaderMenuItem>
      <HeaderMenuItem label="Shop" link="/shop"></HeaderMenuItem>
    </div>
  )
}
HeaderMenu.displayName = "HeaderMenuDesctop"

const useStyles = makeStyles(
  theme => {
    return {
      root: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down("xs")]: {
          flexDirection: "column",
          alignItems: "center",
        },
      },
    }
  },
  { name: HeaderMenu.displayName }
)

import { makeStyles } from "@material-ui/core"
import React, { FC } from "react"
import { HeaderMenuItem } from "./header-item"

export const HeaderMenu: FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
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
        display: "none",
        height: "100%",
        [theme.breakpoints.up("md")]: {
          display: "flex",
        },
      },
    }
  },
  { name: HeaderMenu.displayName }
)

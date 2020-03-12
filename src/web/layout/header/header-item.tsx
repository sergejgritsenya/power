import { makeStyles, Typography } from "@material-ui/core"
import clsx from "clsx"
import React, { FC } from "react"
import { HeaderLink } from "./header-link"

type THeaderMenuItemProps = {
  label: string | React.ReactNode
  link: string
}
export const HeaderMenuItem: FC<THeaderMenuItemProps> = ({ label, link }) => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.root)}>
      <HeaderLink to={link} className={clsx(classes.link)}>
        <Typography className={classes.text} component="div">
          {label}
        </Typography>
      </HeaderLink>
    </div>
  )
}
HeaderMenuItem.displayName = "HeaderMenuItem"

const useStyles = makeStyles(
  theme => {
    return {
      root: {
        height: "100%",
        [theme.breakpoints.only("xs")]: {
          "& + $root": {
            marginTop: "12px",
          },
        },
        [theme.breakpoints.up("md")]: {
          position: "relative",
          "&:hover": {
            "& $link": {
              color: theme.palette.primary.main,
              textDecoration: "none",
            },
          },
        },
      },
      link: {
        height: "100%",
        padding: "0 8px",
        color: theme.palette.secondary.main,
        display: "flex",
        alignItems: "center",
        position: "relative",
        [theme.breakpoints.up("md")]: {
          padding: "0 12px 0 24px",
          "&:hover": {
            color: theme.palette.primary.main,
            textDecoration: "none",
          },
        },
      },
      text: {
        ...theme.typography.h5,
      },
    }
  },
  { name: HeaderMenuItem.displayName }
)

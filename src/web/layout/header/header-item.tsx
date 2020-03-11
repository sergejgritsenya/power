import { makeStyles, Typography } from "@material-ui/core"
import clsx from "clsx"
import React, { FC } from "react"
import { HeaderLink } from "./header-link"

type THeaderMenuItemProps = {
  label: string | React.ReactNode
  link: string
}
export const HeaderMenuItem: FC<THeaderMenuItemProps> = ({ label, link, children }) => {
  const classes = useStyles()
  return (
    <div className={clsx(children && classes.root)}>
      <HeaderLink to={link} className={clsx(classes.link)}>
        <Typography className={classes.text} component="div">
          {label}
        </Typography>
        {children}
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
        [theme.breakpoints.up("md")]: {
          position: "relative",
          "&:after": {
            //triangle
            position: "absolute",
            bottom: "0",
            left: "calc(50%)",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 10px 9px 10px",
            borderColor: "transparent transparent #fafafa transparent",
            transition: ".3s",
          },
          "&:hover": {
            "& $link": {
              color: theme.palette.secondary.main,
              textDecoration: "none",
            },
            "&:after": {
              //triangle
              content: "''",
            },
            "& $secondLvl": {
              display: "block",
            },
            "& $triangle": {
              transform: "rotate(180deg)",
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
        ...theme.typography.subtitle1,
        [theme.breakpoints.up("md")]: {
          ...theme.typography.h5,
        },
      },
    }
  },
  { name: HeaderMenuItem.displayName }
)

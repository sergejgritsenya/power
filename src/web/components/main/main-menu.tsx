import { makeStyles, Typography } from "@material-ui/core"
import clsx from "clsx"
import React, { FC } from "react"
import { HeaderMenuItem } from "../../layout/header/header-item"
import { HeaderLink } from "../../layout/header/header-link"
import { PageInner } from "../common/page-inner"

export const MainMenu: FC = () => {
  const classes = useStyles()
  return (
    <nav>
      <PageInner className={classes.nav}>
        <MainMenuItem label="News" link="/news"></MainMenuItem>
        <MainMenuItem label="Tournaments" link="/tournaments"></MainMenuItem>
        <MainMenuItem label="Shop" link="/shop"></MainMenuItem>
      </PageInner>
    </nav>
  )
}
type TMainMenuItemProps = {
  label: string | React.ReactNode
  link: string
}
const MainMenuItem: FC<TMainMenuItemProps> = ({ label, link }) => {
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
  (theme) => {
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
      nav: {
        display: "flex",
        justifyContent: "center",
        marginTop: "180px",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
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
        color: theme.palette.secondary.main,
        textAlign: "center",
        fontSize: "35px",
        whiteSpace: "pre-line",
        fontWeight: "bold",
      },
    }
  },
  { name: HeaderMenuItem.displayName }
)

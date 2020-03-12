import { makeStyles, Typography } from "@material-ui/core"
import clsx from "clsx"
import React, { FC } from "react"
import { HeaderMenuItem } from "../../layout/header/header-item"
import { WebFooter } from "../../layout/web-footer"
import { PageInner } from "../common/page-inner"

export const WebMainPage: FC = () => {
  const classes = useStyles()
  return (
    <>
      <main className={classes.root}>
        <div className={classes.content}>
          <img
            src="https://static.tildacdn.com/tild3437-6665-4835-b834-366333316638/OLYMPIC13_1.jpg"
            className={clsx(classes.contentItem, classes.logo)}
          />
          <div className={classes.contentItem}>
            <Typography className={clsx(classes.text, classes.textTitle)}>P.O.W.E.R. </Typography>
            <Typography className={classes.text}>
              {"Promotion of Olympic Wrestling \n in European Region"}
            </Typography>
          </div>
        </div>
        <Typography component="div" className={clsx(classes.text, classes.textFooter)}>
          by Classic Sport LLC
        </Typography>
        <PageInner component="nav" className={classes.nav}>
          <div className={classes.text}>
            <HeaderMenuItem label="News" link="/news"></HeaderMenuItem>
          </div>
          <div className={classes.text}>
            <HeaderMenuItem label="Tournaments" link="/tournaments"></HeaderMenuItem>
          </div>
          <div className={classes.text}>
            <HeaderMenuItem label="Shop" link="/shop"></HeaderMenuItem>
          </div>
        </PageInner>
      </main>
      <WebFooter />
    </>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    minHeight: "calc(100vh - 110px)",
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(100vh - 231px)",
    },
  },
  logo: {
    width: "290px",
  },
  text: {
    color: theme.palette.secondary.main,
    textAlign: "center",
    fontSize: "21px",
    whiteSpace: "pre-line",
  },
  textTitle: {
    fontSize: "100px",
    lineHeight: "1.55 rem",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
  },
  textFooter: {
    marginTop: "140px",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "140px",
    paddingTop: "20vh",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "1fr",
    },
  },
  contentItem: {
    justifySelf: "flex-end",
    "&:last-child": {
      justifySelf: "flex-start",
    },
    [theme.breakpoints.down("sm")]: {
      justifySelf: "center",
      "&:last-child": {
        justifySelf: "center",
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
}))

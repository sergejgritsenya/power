import { makeStyles, Typography } from "@material-ui/core"
import clsx from "clsx"
import React, { FC } from "react"
import { MainMenu } from "./main-menu"

export const WebMainPage: FC = () => {
  const classes = useStyles()
  return (
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
      <MainMenu />
    </main>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    minHeight: "100vh",
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
    marginTop: "50px",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "70px",
    paddingTop: "20vh",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0vh",
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
}))

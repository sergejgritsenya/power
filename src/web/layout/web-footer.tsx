import { makeStyles, Typography } from "@material-ui/core"
import YouTubeIcon from "@material-ui/icons/YouTube"
import clsx from "clsx"
import React, { FC } from "react"
import { PageInner } from "../components/common/page-inner"

export const WebFooter: FC = () => {
  const classes = useStyles()
  const yearNow = new Date().getFullYear()
  return (
    <>
      <div className={classes.stub} />
      <footer className={clsx(classes.root, classes.stub)}>
        <PageInner className={classes.inner}>
          <div className={classes.footerItem}>
            <Typography className={classes.text}>Contact us:</Typography>
            <Typography
              className={classes.text}
              component="a"
              href={"mailto:pilipenko.wrestling@gmail.com"}
            >
              pilipenko.wrestling@gmail.com
            </Typography>
            <Typography component="a" href="tel:+1 718 509 5655" className={classes.text}>
              +1 718 509 5655
            </Typography>
          </div>
          <a
            className={clsx(classes.footerItem, classes.footerItemIcon)}
            href={"https://www.youtube.com/channel/UCOE3vmiJp1pUxCxCPOYkkQw"}
            target="_blank"
          >
            <YouTubeIcon className={classes.youtubeIcon} />
          </a>
          <div className={classes.footerItem}>
            <Typography className={classes.text}>© {yearNow}. All rights reserved.</Typography>
            <Typography className={classes.text}>
              Use and/or distribution of any content without written{" "}
            </Typography>
            <Typography className={classes.text}>
              consent of its respective owner is prohibited.
            </Typography>
          </div>
        </PageInner>
      </footer>
    </>
  )
}

const youtubeSize: number = 57
const youtubeSizeMobile: number = 45
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      position: "relative",
    },
  },
  stub: {
    height: "110px",
    [theme.breakpoints.down("sm")]: {
      height: "231px",
    },
    [theme.breakpoints.down(400)]: {
      height: "250px",
    },
    [theme.breakpoints.down(390)]: {
      height: "260px",
    },
  },
  root: {
    background: theme.palette.primary.dark,

    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    padding: "15px 0",
  },
  inner: {
    paddingBottom: 0,
    paddingTop: 0,
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  footerItem: {
    flex: "1 1 100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",

    [theme.breakpoints.down("md")]: {
      "& + $footerItem": {
        marginTop: "12px",
      },
    },
  },
  footerItemIcon: {
    justifyContent: "center",
  },
  youtubeIcon: {
    color: theme.palette.secondary.main,
    width: youtubeSize,
    height: youtubeSize,
    [theme.breakpoints.down("md")]: {
      width: youtubeSizeMobile,
      height: youtubeSizeMobile,
    },
  },
  text: {
    color: theme.palette.secondary.main,
    fontSize: "15px",
    textAlign: "center",
  },
}))

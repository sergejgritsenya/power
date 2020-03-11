import { makeStyles, Typography } from "@material-ui/core"
import React, { FC } from "react"
import { ButtonLink } from "../../../common/front-sdk/button-link"

export const HeaderLogo: FC = () => {
  const classes = useStyles()
  return (
    <ButtonLink variant="text" color="inherit" to="/" className={classes.root}>
      <Typography className={classes.text} component="div">
        P.O.W.E.R.
      </Typography>
    </ButtonLink>
  )
}
HeaderLogo.displayName = "HeaderLogo"

const useStyles = makeStyles(
  theme => {
    return {
      root: {
        height: "100%",
        [theme.breakpoints.up("sm")]: {
          marginRight: "106px",
        },
      },
      img: {
        height: "12px",
        [theme.breakpoints.up("sm")]: {
          height: "20px",
        },
      },
      text: {
        color: theme.palette.secondary.main,
        ...theme.typography.subtitle1,
        [theme.breakpoints.up("md")]: {
          ...theme.typography.h5,
        },
      },
    }
  },
  { name: HeaderLogo.displayName }
)

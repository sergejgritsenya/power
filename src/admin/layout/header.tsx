import { AppBar, Theme, Toolbar, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React, { FC } from "react"

export const AdminHeader: FC = () => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.left}>
          <Typography>P.O.W.E.R. ADMIN</Typography>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  left: {
    flexGrow: 1,
    color: theme.palette.common.black,
  },
}))

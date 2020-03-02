import { AppBar, Toolbar, Typography } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/styles"
import React, { FC } from "react"

const useStyles = makeStyles(
  createStyles({
    left: {
      flexGrow: 1,
      color: "#b89960",
    },
  })
)
export const AdminHeader: FC = () => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.left}>
          <Typography>P-O-W-E-R ADMIN</Typography>
        </div>
      </Toolbar>
    </AppBar>
  )
}

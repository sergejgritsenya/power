import { AppBar, Button, Grid, Theme, Toolbar, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React, { FC, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "./di-context"

export const AdminHeader: FC = () => {
  const auth = useAuth()
  const history = useHistory()
  const classes = useStyles()
  useEffect(() => {
    if (!auth.loaded) {
      history.replace("/login", { redirect_location: history.location })
    }
  }, [])
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.left}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography>P.O.W.E.R. ADMIN</Typography>
            </Grid>
            <Grid item>
              <Button color="secondary" onClick={auth.logout}>
                Logout
              </Button>
            </Grid>
          </Grid>
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

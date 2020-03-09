import {
  Avatar,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { useSnackbar } from "notistack"
import React, { FC } from "react"
import { useHistory } from "react-router-dom"
import { useAxios } from "../../layout/di-context"
import { Locker } from "../common/locker"

export const Login: FC = () => {
  const history = useHistory()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const login = async () => {
    try {
      enqueueSnackbar("Success", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      })
      return e
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h3" gutterBottom align="center">
          Power Admin Login
        </Typography>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <TextField label="Login" type="text" autoComplete="login" required />
          </Grid>
          <Grid item xs={12}>
            <TextField type="password" label="Password" autoComplete="current-password" required />
          </Grid>
        </Grid>
        <Button color="primary" onClick={login}>
          Login
        </Button>
        <Locker show={false} />
      </div>
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}))

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
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { useAxios } from "../../layout/di-context"
import { Locker } from "../common/locker"
import { adminLogin } from "./auth-sdk"
import { LoginModel } from "./login-model"

export const Login: FC = () => {
  const history = useHistory()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const login_model = useMemo(() => {
    const model = new LoginModel({})
    return model
  }, [])
  const login = async () => {
    await axios.sendPost(adminLogin(login_model.json))
    login_model.setLoading(true)
    try {
      login_model.setLoading(false)
      enqueueSnackbar("Success", {
        variant: "success",
      })
    } catch (e) {
      login_model.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      return e
    }
  }
  return <LoginField login_model={login_model} login={login} />
}

type TLoginFieldProps = {
  login_model: LoginModel
  login: () => void
}
const LoginField: FC<TLoginFieldProps> = props => {
  const { login_model, login } = props
  const classes = useStyles()
  return useObserver(() => (
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
            <TextField
              label="Login"
              type="text"
              autoComplete="login"
              required
              value={login_model.login}
              onChange={e => login_model.setLogin(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              autoComplete="current-password"
              required
              value={login_model.password}
              onChange={e => login_model.setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container justify="flex-end" alignItems="center">
          <Grid item>
            <Button color="primary" onClick={login}>
              Login
            </Button>
          </Grid>
        </Grid>
        <Locker show={login_model.is_loading} />
      </div>
    </Container>
  ))
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

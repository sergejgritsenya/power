import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { TChykLoadData } from "../.."
import { TAdmin, TAdminChangePasswordProps } from "../../../common/types/admin-types"
import { useAxios } from "../../layout/di-context"
import { Locker } from "../common/locker"
import { SaveButton } from "../common/save-button"
import { AccountModel, ChangePasswordModel } from "./account-model"
import { adminChangePassword, adminUpdate } from "./auth-sdk"

type TAdminAccountData = AxiosResponse<TAdmin>
export const adminAccountLoader: TChykLoadData<TAdminAccountData> = async (_, { auth }) =>
  auth.getAdmin()
type TAdminAccountProps = TRouteComponentProps<TAdminAccountData>

export const AdminAccount: FC<TAdminAccountProps> = ({ data }) => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const admin = useMemo(() => {
    const model = new AccountModel(data)
    return model
  }, [])
  const update = async () => {
    admin.setLoading(true)
    try {
      await axios.sendPost(adminUpdate(admin.json))
      admin.setLoading(false)
      enqueueSnackbar("Successfully saved", {
        variant: "success",
      })
    } catch (e) {
      admin.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }
  const changePassword = async (data: TAdminChangePasswordProps) => {
    admin.setLoading(true)
    try {
      await axios.sendPost(adminChangePassword(data))
      admin.setLoading(false)
      enqueueSnackbar("Successfully saved", {
        variant: "success",
      })
    } catch (e) {
      admin.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }
  return useObserver(() => (
    <Card>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <CardHeader title="Admin Account" />
          </Grid>
          <Grid item>
            <ChangePasswordDialog changePassword={changePassword} />
          </Grid>
        </Grid>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              label="login"
              value={admin.login}
              onChange={e => admin.setLogin(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="email"
              value={admin.email}
              onChange={e => admin.setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        {admin.validation && <SaveButton save={update} />}
        <Locker show={admin.is_loading} />
      </CardContent>
    </Card>
  ))
}

type TChangePasswordDialogProps = {
  changePassword: (data: TAdminChangePasswordProps) => void
}
const ChangePasswordDialog: FC<TChangePasswordDialogProps> = props => {
  const { changePassword } = props
  const pass_model = useMemo(() => {
    const model = new ChangePasswordModel({})
    return model
  }, [])
  const change = async () => {
    await changePassword(pass_model.json)
    pass_model.clean()
  }
  return useObserver(() => (
    <>
      <Button color="primary" onClick={() => pass_model.setOpen(true)}>
        Change password
      </Button>
      <Dialog open={pass_model.open} onClose={() => pass_model.setOpen(false)}>
        <DialogTitle>Change password form</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} md={6}>
              <TextField
                label="old password"
                value={pass_model.old_password}
                onChange={e => pass_model.setOldPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6} />
            <Grid item xs={12} md={6}>
              <TextField
                label="new password"
                value={pass_model.new_password}
                onChange={e => pass_model.setNewPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="confirm new password"
                value={pass_model.confirm_password}
                onChange={e => pass_model.setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => pass_model.setOpen(false)}>
            close
          </Button>
          <Button color="secondary" onClick={change} disabled={!pass_model.validation}>
            change
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ))
}

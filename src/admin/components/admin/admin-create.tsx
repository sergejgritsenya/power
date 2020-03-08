import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { useAxios } from "../../layout/di-context"
import { Locker } from "../common/locker"
import { SaveButton } from "../common/save-button"
import { CreateAdminModel } from "./admin-model"
import { adminCreate } from "./admin-sdk"

export const AdminCreate: FC = () => {
  const axios = useAxios()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const admin = useMemo(() => {
    const model = new CreateAdminModel({})
    return model
  }, [])
  const create = async () => {
    admin.setLoading(true)
    try {
      const data = admin.json
      const res = await axios.sendPost<string>(adminCreate(data))
      admin.setLoading(false)
      enqueueSnackbar("Successfully created", {
        variant: "success",
      })
      history.replace(`/admins/${res.data}`)
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
      <CardHeader title={`Create new admin: ${admin.name}`} />
      <CardContent>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <TextField
              label="name"
              value={admin.name}
              onChange={e => admin.setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              label="email"
              value={admin.email}
              onChange={e => admin.setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              label="password"
              type="password"
              value={admin.password}
              onChange={e => admin.setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              label="confirm password"
              type="password"
              value={admin.confirm_password}
              onChange={e => admin.setConfirmPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        {admin.validation && <SaveButton save={create} />}
        <Locker show={admin.is_loading} />
      </CardContent>
    </Card>
  ))
}

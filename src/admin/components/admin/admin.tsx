import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import React, { FC, useMemo } from "react"
import { TChykLoadData } from "../.."
import { TAdmin } from "../../../common/types/admin-types"
import { AdminModel } from "./admin-model"
import { adminGet } from "./admin-sdk"

type TAdminData = AxiosResponse<TAdmin>
export const adminLoader: TChykLoadData<TAdminData, { id: string }> = async (
  { match },
  { axios }
) => axios.sendPost<TAdmin>(adminGet(match.params.id))

type TAdminProps = TRouteComponentProps<TAdminData>
export const Admin: FC<TAdminProps> = ({ data }) => {
  const admin_model = useMemo(() => {
    const model = new AdminModel(data)
    return model
  }, [])
  return <AdminField admin={admin_model} />
}

type TAdminFieldProps = {
  admin: AdminModel
}
const AdminField: FC<TAdminFieldProps> = props => {
  const { admin } = props
  return useObserver(() => (
    <Card>
      <CardHeader title={`Hello Admin: ${admin.login}`} />
      <CardContent>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <TextField
              label="login"
              value={admin.login}
              onChange={e => admin.setLogin(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              label="email"
              value={admin.email}
              onChange={e => admin.setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  ))
}

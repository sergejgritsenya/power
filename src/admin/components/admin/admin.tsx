import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import React, { FC, useMemo } from "react"
import { TChykLoadData } from "../.."
import { AdminModel } from "./admin-model"

type TAdminData = {}
export const adminLoader: TChykLoadData<TAdminData, { id: string }> = async ({ match }, {}) => ({
  admin_id: match.params.id,
})

type TAdminProps = TRouteComponentProps<TAdminData>
export const Admin: FC<TAdminProps> = ({ match }) => {
  const admin = useMemo(() => {
    const model = new AdminModel({ id: match.params.id })
    return model
  }, [])
  return <AdminField admin={admin} />
}

type TAdminFieldProps = {
  admin: AdminModel
}
const AdminField: FC<TAdminFieldProps> = props => {
  const { admin } = props
  return useObserver(() => (
    <Card>
      <CardHeader title={`Hello Admin: ${admin.name}`} />
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
        </Grid>
      </CardContent>
    </Card>
  ))
}

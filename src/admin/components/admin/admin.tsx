import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import React, { FC, useMemo } from "react"
import { RouteComponentProps } from "react-router-dom"
import { AdminModel } from "./admin-model"

type TAdminLoaderProps = {} & RouteComponentProps<{
  admin_id: string
}>
export const AdminLoader: FC<TAdminLoaderProps> = props => {
  const { admin_id } = props.match.params
  // const [admin, setAdmin] = useState<any>(null)
  // const load = async () => {
  //   setAdmin(admin_id)
  // }
  // useEffect(() => {
  //   load()
  // }, [])
  return <Admin admin_data={admin_id} />
}
type TAdminProps = {
  admin_data: string
}
const Admin: FC<TAdminProps> = props => {
  const { admin_data } = props
  const admin = useMemo(() => {
    const model = new AdminModel({ id: admin_data })
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

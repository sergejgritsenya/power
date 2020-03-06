import { Button, Card, CardContent, CardHeader, Grid } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { ButtonLink } from "../../../common/front-sdk/button-link"
import { admin_root_routes } from "../../../common/routes"
import { TAdminList } from "../../../common/types/admin-types"
import { NoElements } from "../common/no-elements"

type TAdminListData = AxiosResponse<TAdminList[]>
export const adminListLoader: TChykLoadData<TAdminListData> = async (_, { axios }) =>
  axios.post(admin_root_routes.list)
type TAdminListProps = TRouteComponentProps<TAdminListData>

export const AdminList: FC<TAdminListProps> = ({ data }) => {
  console.log("admin_list", data)
  const admin_list = data || []
  const deleteAdmin = async (admin_id: string) => {
    console.log(admin_id)
  }
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <CardHeader title="Admin List" />
          </Grid>
          <Grid item>
            <ButtonLink to="/admins/create" color="primary">
              Create new admin
            </ButtonLink>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={12} md={6} lg={3}>
            Name
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            Email
          </Grid>
          <Grid item xs={12} md={6} lg={3} />
          <Grid item xs={12} md={6} lg={3} />
        </Grid>
        <AdminListTable admin_list={admin_list} deleteAdmin={deleteAdmin} />
      </CardContent>
    </Card>
  )
}

type TAdminListTableProps = {
  admin_list: TAdminList[]
  deleteAdmin: (admin_id: string) => void
}
export const AdminListTable: FC<TAdminListTableProps> = props => {
  const { admin_list, deleteAdmin } = props
  return (
    <div>
      {admin_list.length ? (
        admin_list.map(admin => (
          <Grid container justify="flex-start" alignItems="center">
            <Grid item xs={12} md={6} lg={3}>
              {admin.name}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              {admin.email}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ButtonLink to={`/admins/${admin.id}`}>More</ButtonLink>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Button color="secondary" onClick={() => deleteAdmin(admin.id)}>
                Delete
              </Button>
            </Grid>
          </Grid>
        ))
      ) : (
        <NoElements />
      )}
    </div>
  )
}

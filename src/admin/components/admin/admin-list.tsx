import { Card, CardContent, CardHeader, Divider, Grid } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { TChykLoadData } from "../.."
import { ButtonLink } from "../../../common/front-sdk/button-link"
import { TAdminList } from "../../../common/types/admin-types"
import { useAxios } from "../../layout/di-context"
import { ApplyRemoveDialog } from "../common/apply-remove-dialog"
import { ListModel } from "../common/list-model"
import { Locker } from "../common/locker"
import { NoElements } from "../common/no-elements"
import { adminDelete, adminList } from "./admin-sdk"

type TAdminListData = AxiosResponse<TAdminList[]>
export const adminListLoader: TChykLoadData<TAdminListData> = async (_, { axios }) =>
  axios.sendPost<TAdminList[]>(adminList())
type TAdminListProps = TRouteComponentProps<TAdminListData>

export const AdminList: FC<TAdminListProps> = ({ data }) => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const admin_list = useMemo(() => {
    const model = new ListModel<TAdminList>({})
    model.setList(data)
    return model
  }, [])
  const deleteAdmin = async (admin_id: string) => {
    admin_list.setLoading(true)
    try {
      const res = await axios.sendPost<TAdminList[]>(adminDelete(admin_id))
      admin_list.setList(res.data)
      admin_list.setLoading(false)
      enqueueSnackbar("Successfully deleted", {
        variant: "success",
      })
    } catch (e) {
      admin_list.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <CardHeader title="Admin list" />
          </Grid>
          <Grid item>
            <ButtonLink to="/admins/create" color="primary">
              Create
            </ButtonLink>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={12} md={6} lg={3}>
            <h3> Name</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h3>Email</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={3} />
          <Grid item xs={12} md={6} lg={3} />
        </Grid>
        <AdminListTable admin_list={admin_list} deleteAdmin={deleteAdmin} />
        <Locker show={admin_list.is_loading} />
      </CardContent>
    </Card>
  )
}

type TAdminListTableProps = {
  admin_list: ListModel<TAdminList>
  deleteAdmin: (admin_id: string) => void
}
export const AdminListTable: FC<TAdminListTableProps> = props => {
  const { admin_list, deleteAdmin } = props
  return useObserver(() => (
    <div>
      {admin_list.list.length ? (
        admin_list.list.map(admin => (
          <div key={admin.id}>
            <Grid container justify="flex-start" alignItems="center" style={{ padding: "7px 0" }}>
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
                <ApplyRemoveDialog
                  id={admin.id}
                  removeEntity={deleteAdmin}
                  entity_name={`admin ${admin.name}`}
                />
              </Grid>
            </Grid>
            <Divider />
          </div>
        ))
      ) : (
        <NoElements />
      )}
    </div>
  ))
}

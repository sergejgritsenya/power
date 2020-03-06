import { Button, Card, CardContent, CardHeader, Grid } from "@material-ui/core"
import { AxiosInstance } from "axios"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { ButtonLink } from "../../../front-sdk/button-link"
import { AdminSdk } from "./admin-sdk"

type TAdminListData = { axios: AxiosInstance }
export const adminListLoader: TChykLoadData<TAdminListData> = async (_, { axios }) => {
  return { axios }
}

type TAdminListProps = TRouteComponentProps<TAdminListData>
export const AdminList: FC<TAdminListProps> = ({ axios }) => {
  const admin_sdk = new AdminSdk(axios)
  const getList = async () => {
    const r = await admin_sdk.adminList()
    console.log(r)
  }
  return (
    <Card>
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
      <CardContent>
        <h1>Admin List</h1>
        <Button color="primary" onClick={getList}>
          Get list
        </Button>
      </CardContent>
    </Card>
  )
}

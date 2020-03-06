import { Button, Card, CardContent, CardHeader, Grid } from "@material-ui/core"
import { TRouteComponentProps } from "chyk"
import { Container } from "inversify"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { ButtonLink } from "../../../common/front-sdk/button-link"
import { AdminSdk } from "./admin-sdk"

type TAdminListData = { container: Container }
export const adminListLoader: TChykLoadData<TAdminListData> = async (_, { container }) => {
  const admin_sdk = container.get(AdminSdk)
  const r = await admin_sdk.adminList()
  console.log(r)
  return { container }
}
type TAdminListProps = TRouteComponentProps<TAdminListData>

export const AdminList: FC<TAdminListProps> = ({}) => {
  const getList = async () => {}
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

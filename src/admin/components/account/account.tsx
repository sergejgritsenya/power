import { Button, Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { admin_root_routes } from "../../../common/routes"
import { TAdmin } from "../../../common/types/admin-types"

type TAdminAccountData = AxiosResponse<TAdmin>
export const adminAccountLoader: TChykLoadData<TAdminAccountData> = async (_, { axios }) =>
  axios.sendPost<TAdmin>({ route: admin_root_routes.admin_me })
type TAdminAccountProps = TRouteComponentProps<TAdminAccountData>

export const AdminAccount: FC<TAdminAccountProps> = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <CardHeader title="Admin Account" />
          </Grid>
          <Grid item>
            <Button color="primary">Change password</Button>
          </Grid>
        </Grid>
        <TextField label="login" value={data.login} />
        <TextField label="email" value={data.email} />
      </CardContent>
    </Card>
  )
}

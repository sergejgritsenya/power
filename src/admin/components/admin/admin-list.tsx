import { Card, CardContent, CardHeader, Grid } from "@material-ui/core"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { ButtonLink } from "../../../front-sdk/button-link"

type TAdminListData = {}
export const adminListLoader: TChykLoadData<TAdminListData> = async (_, {}) => ({})

type TAdminListProps = TRouteComponentProps<TAdminListData>
export const AdminList: FC<TAdminListProps> = () => {
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
      </CardContent>
    </Card>
  )
}

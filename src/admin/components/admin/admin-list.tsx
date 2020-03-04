import { Card, CardContent, CardHeader, Grid } from "@material-ui/core"
import React, { FC } from "react"
import { ButtonLink } from "../../../front-sdk/button-link"

export const AdminList: FC = () => {
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

import { Button, Card, CardContent, CardHeader, Grid } from "@material-ui/core"
import React, { FC } from "react"

export const AdminAccount: FC = () => {
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
      </CardContent>
    </Card>
  )
}

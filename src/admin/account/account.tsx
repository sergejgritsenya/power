import { Button, Card, CardContent } from "@material-ui/core"
import React, { FC } from "react"

export const AdminAccount: FC = () => {
  return (
    <Card>
      <CardContent>
        <h1>Admin Account</h1>
        <Button color="default">Hello</Button>
        <Button color="primary">Hello</Button>
        <Button color="secondary">Hello</Button>
      </CardContent>
    </Card>
  )
}

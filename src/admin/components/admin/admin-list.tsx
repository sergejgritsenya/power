import { Button, Card, CardContent, CardHeader, Grid } from "@material-ui/core"
import Axios from "axios"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { ButtonLink } from "../../../front-sdk/button-link"

type TAdminListData = {}
export const adminListLoader: TChykLoadData<TAdminListData> = async (_, {}) => {
  return {}
}

type TAdminListProps = TRouteComponentProps<TAdminListData>
export const AdminList: FC<TAdminListProps> = ({}) => {
  const sendGet = async () => {
    const r = await Axios.get("http://localhost:3088/admin")
    console.log(r.data)
  }
  const sendPost = async () => {
    const r = await Axios.post("http://localhost:3088/admin")
    console.log(r.data)
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
        <Button color="primary" onClick={sendGet}>
          Send get
        </Button>
        <Button color="secondary" onClick={sendPost}>
          Send post
        </Button>
      </CardContent>
    </Card>
  )
}

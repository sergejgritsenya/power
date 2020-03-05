import { Button, Card, CardContent, CardHeader, Grid } from "@material-ui/core"
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
  // const admin_sdk = new AdminSdk()
  const sendGet = async () => {
    // const r = await Axios.get("http://localhost:3087")
    // console.log(r.data)
    const q = await fetch("http://localhost:3088/admin").then(r => r.json)
    console.log(q)

    // await admin_sdk.testGet()
  }
  const sendPost = async () => {
    // await admin_sdk.testPost()
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

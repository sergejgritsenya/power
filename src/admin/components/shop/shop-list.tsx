import { Card, CardContent, CardHeader, Grid } from "@material-ui/core"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."

type TShopListData = {}
export const shopListLoader: TChykLoadData<TShopListData> = async (_, {}) => ({})

type TShopListProps = TRouteComponentProps<TShopListData>
export const ShopList: FC<TShopListProps> = () => {
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <CardHeader title="Shop list" />
          </Grid>
          <Grid item>
            {/* <ButtonLink to="/shop/create" color="primary">
            Create new shop
          </ButtonLink> */}
          </Grid>
        </Grid>
        <h1>Coming soon</h1>
      </CardContent>
    </Card>
  )
}

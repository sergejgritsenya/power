import { Grid, makeStyles } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { TShopList } from "../../../common/types/shop-types"
import { WebNoElements } from "../common/no-elements"
import { shopList } from "./shop-sdk"

type TShopListData = AxiosResponse<TShopList[]>
export const webShopListLoader: TChykLoadData<TShopListData> = async (_, { axios }) =>
  axios.sendPost(shopList())
type TShopListProps = TRouteComponentProps<TShopListData>

export const WebShopList: FC<TShopListProps> = ({ data: shops }) => {
  const classes = useStyles()
  return (
    <Grid container justify="center" className={classes.superRoot}>
      {shops.length ? (
        shops.map(item => (
          <Grid
            item
            xs={12}
            md={3}
            key={item.id}
            className={classes.root}
            component="a"
            href={`/shop/${item.id}`}
          >
            <img src={item.logo || "/static/default-img.png"} className={classes.image} />
          </Grid>
        ))
      ) : (
        <WebNoElements />
      )}
    </Grid>
  )
}

const useStyles = makeStyles(_theme => ({
  superRoot: {
    minHeight: "calc(100vh - 110px - 100px)",
    paddingTop: "30px",
    marginBottom: "15px",
  },
  root: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px",
  },
  image: {
    width: "290px",
    height: "450px",
  },
}))

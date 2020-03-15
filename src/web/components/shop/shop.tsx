import { Grid, makeStyles } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { TShop } from "../../../common/types/shop-types"
import { shopGet } from "./shop-sdk"

type TShopData = AxiosResponse<TShop>
export const webShopLoader: TChykLoadData<TShopData> = async ({ match }, { axios }) =>
  axios.sendPost(shopGet(match.params.shop_id))
type TShopProps = TRouteComponentProps<TShopData>

export const WebShop: FC<TShopProps> = ({ data: shop }) => {
  const classes = useStyles()
  return (
    <>
      <Grid container justify="center" className={classes.superRoot}>
        <Grid item xs={12} md={6} className={classes.root}>
          <img src={shop.logo || "/static/default-img.png"} className={classes.logo} />
        </Grid>
        <Grid item xs={12} md={6} className={classes.root}>
          <div className={classes.text}>{shop.description}</div>
        </Grid>
        {shop.images.length ? (
          <Grid container justify="center" className={classes.superRoot}>
            {shop.images.map(image => (
              <Grid item xs={12} md={6} className={classes.root} key={image.id}>
                <img src={image.url} className={classes.image} />
              </Grid>
            ))}
          </Grid>
        ) : null}
      </Grid>
    </>
  )
}

const useStyles = makeStyles(theme => ({
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
  logo: {
    width: "290px",
    height: "450px",
  },
  image: {
    width: "200px",
    height: "200px",
  },
  text: {
    color: theme.palette.primary.light,
  },
}))

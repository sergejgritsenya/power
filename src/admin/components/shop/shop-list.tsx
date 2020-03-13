import { Avatar, Card, CardContent, CardHeader, Divider, Grid, makeStyles } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { TChykLoadData } from "../.."
import { ButtonLink } from "../../../common/front-sdk/button-link"
import { TShopList } from "../../../common/types/shop-types"
import { useAxios } from "../../layout/di-context"
import { ApplyRemoveDialog } from "../common/apply-remove-dialog"
import { ListModel } from "../common/list-model"
import { Locker } from "../common/locker"
import { NoElements } from "../common/no-elements"
import { shopDelete, shopList } from "./shop-sdk"

type TShopListData = AxiosResponse<TShopList[]>
export const shopListLoader: TChykLoadData<TShopListData> = async (_, { axios }) =>
  axios.sendPost<TShopList[]>(shopList())

type TShopListProps = TRouteComponentProps<TShopListData>
export const ShopList: FC<TShopListProps> = ({ data }) => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const shop_list = useMemo(() => {
    const model = new ListModel<TShopList>({})
    model.setList(data)
    return model
  }, [])
  const deleteShop = async (shop_id: string) => {
    shop_list.setLoading(true)
    try {
      const res = await axios.sendPost<TShopList[]>(shopDelete(shop_id))
      shop_list.setList(res.data)
      shop_list.setLoading(false)
      enqueueSnackbar("Succesfully deleted", {
        variant: "success",
      })
    } catch (e) {
      shop_list.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
    }
  }
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <CardHeader title="Shop list" />
          </Grid>
          <Grid item>
            <ButtonLink to="/shop/create" color="primary">
              Create
            </ButtonLink>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={12} md={6} lg={2}>
            <h3>Logo</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <h3>Name</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={3} />
          <Grid item xs={12} md={6} lg={3} />
        </Grid>
        <ShopListTable shop_list={shop_list} deleteShop={deleteShop} />
        <Locker show={shop_list.is_loading} />
      </CardContent>
    </Card>
  )
}

type TShopListTableProps = {
  shop_list: ListModel<TShopList>
  deleteShop: (shop_id: string) => void
}
const ShopListTable: FC<TShopListTableProps> = ({ shop_list, deleteShop }) => {
  const classes = useStyles()
  return useObserver(() => (
    <div>
      {shop_list.list.length ? (
        shop_list.list.map(shop => (
          <div key={shop.id}>
            <Grid container justify="flex-start" alignItems="center" style={{ padding: "7px 0" }}>
              <Grid item xs={12} md={6} lg={2}>
                {shop.logo ? (
                  <Avatar src={shop.logo} variant="rounded" className={classes.avatar} />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                {shop.name}
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <ButtonLink to={`shop/${shop.id}`}>More</ButtonLink>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <ApplyRemoveDialog id={shop.id} removeEntity={deleteShop} entity_name="shop" />
              </Grid>
            </Grid>
            <Divider />
          </div>
        ))
      ) : (
        <NoElements />
      )}
    </div>
  ))
}

const useStyles = makeStyles(_theme => ({
  avatar: {
    width: "auto",
    display: "flex",
    justifyContent: "flex-start",
    "& img": {
      width: "auto",
      objectFit: "contain",
    },
  },
}))

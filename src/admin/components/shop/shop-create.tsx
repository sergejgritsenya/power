import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { useAxios } from "../../layout/di-context"
import { Locker } from "../common/locker"
import { SaveButton } from "../common/save-button"
import { CreateShopModel } from "./shop-model"
import { shopCreate } from "./shop-sdk"

export const ShopCreate: FC = () => {
  const axios = useAxios()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const shop = useMemo(() => {
    const model = new CreateShopModel({})
    return model
  }, [])
  const create = async () => {
    shop.setLoading(true)
    try {
      const res = await axios.sendPost<string>(shopCreate(shop.json))
      shop.setLoading(false)
      enqueueSnackbar("Successfully created", {
        variant: "success",
      })
      history.replace(`/shop/${res.data}`)
    } catch (e) {
      shop.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }
  return useObserver(() => (
    <Card>
      <CardHeader title={`Create new shop: ${shop.name}`} />
      <CardContent>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <TextField
              label="name"
              value={shop.name}
              onChange={(e) => shop.setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              label="price"
              value={shop.price}
              onChange={(e) => shop.setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="description"
              value={shop.description}
              onChange={(e) => shop.setDescription(e.target.value)}
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        {shop.validation && <SaveButton save={create} />}
      </CardContent>
      <Locker show={shop.is_loading} />
    </Card>
  ))
}

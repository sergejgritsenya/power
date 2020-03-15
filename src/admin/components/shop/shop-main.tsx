import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC } from "react"
import { TShop } from "../../../common/types/shop-types"
import { useAxios } from "../../layout/di-context"
import { ImageUpload } from "../common/image-upload"
import { Locker } from "../common/locker"
import { SaveButton } from "../common/save-button"
import { useShopContext } from "./shop"
import { ShopModel } from "./shop-model"
import { shopDeleteLogo, shopUpdate, shopUploadLogo } from "./shop-sdk"

export const ShopMain: FC = () => {
  const shop = useShopContext()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const update = async () => {
    shop.setLoading(true)
    try {
      const res = await axios.sendPost<TShop>(shopUpdate(shop.id, shop.json))
      shop.updateAll(res.data)
      shop.setLoading(false)
      enqueueSnackbar("Successfully saved", {
        variant: "success",
      })
    } catch (e) {
      shop.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }
  return <ShopField shop={shop} update={update} />
}

type TShopFieldProps = {
  shop: ShopModel
  update: () => void
}
const ShopField: FC<TShopFieldProps> = props => {
  const { shop, update } = props
  return useObserver(() => (
    <Card>
      <CardHeader title={`Shop ${shop.name}`} />
      <CardContent>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={9}>
            <Grid item xs={9}>
              <Grid container>
                <Grid item xs={12} lg={6}>
                  <TextField
                    label="name"
                    value={shop.name}
                    onChange={e => shop.setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    label="price"
                    value={shop.price}
                    onChange={e => shop.setPrice(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="description"
                    value={shop.description}
                    onChange={e => shop.setDescription(e.target.value)}
                    multiline
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <LogoUpload />
          </Grid>
        </Grid>
        {shop.validation && <SaveButton save={update} />}
      </CardContent>
      <Locker show={shop.is_loading} />
    </Card>
  ))
}

const LogoUpload: FC = () => {
  const shop = useShopContext()
  const axios = useAxios()
  const logo_src = shop.logo || "/static/default-img.png"
  const upload = async (file: File) => {
    const res = await axios.sendPost<string>(shopUploadLogo(shop.id, file))
    shop.setLogo(res.data)
  }
  const deleteLogo = async () => {
    await axios.sendPost<string>(shopDeleteLogo(shop.id))
    shop.setLogo(null)
  }
  return useObserver(() => <ImageUpload src={logo_src} upload={upload} deleteLogo={deleteLogo} />)
}

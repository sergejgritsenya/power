import {
  frontRoute,
  shop_image_routes,
  shop_root_routes,
  shop_routes,
} from "../../../common/routes"
import { TAxiosSendProps } from "../../../common/types/common-types"
import { TShopUpdateProps } from "../../../common/types/shop-types"

export const shopList = (): TAxiosSendProps => ({ route: shop_root_routes.list })

export const shopGet = (shop_id: string): TAxiosSendProps => ({
  route: frontRoute(shop_routes.get, { shop_id }),
})

export const shopCreate = (data: TShopUpdateProps): TAxiosSendProps => ({
  route: shop_root_routes.create,
  data,
})

export const shopUpdate = (shop_id: string, data: TShopUpdateProps): TAxiosSendProps => ({
  route: frontRoute(shop_routes.update, { shop_id }),
  data,
})

export const shopUploadLogo = (shop_id: string, file: File): TAxiosSendProps => {
  const data = new FormData()
  data.append("file", file)
  return {
    route: frontRoute(shop_routes.upload, { shop_id }),
    data,
  }
}
export const shopDeleteLogo = (shop_id: string): TAxiosSendProps => ({
  route: frontRoute(shop_routes.deleteLogo, { shop_id }),
})

export const shopDelete = (shop_id: string): TAxiosSendProps => ({
  route: shop_root_routes.delete,
  data: { shop_id },
})

export const shopImageUpload = (shop_id: string, file: File): TAxiosSendProps => {
  const data = new FormData()
  data.append("file", file)
  return {
    route: frontRoute(shop_image_routes.upload, { shop_id }),
    data,
  }
}
export const shopImageDelete = (shop_id: string, image_id: string): TAxiosSendProps => ({
  route: frontRoute(shop_image_routes.delete, { shop_id }),
  data: { image_id },
})

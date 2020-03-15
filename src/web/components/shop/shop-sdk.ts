import { frontRoute } from "../../../common/routes"
import { TAxiosSendProps } from "../../../common/types/common-types"
import { web_shop_root_routes, web_shop_routes } from "../../../common/web-routes"

export const shopList = (): TAxiosSendProps => ({ route: web_shop_root_routes.list })
export const shopGet = (shop_id: string): TAxiosSendProps => ({
  route: frontRoute(web_shop_routes.get, { shop_id }),
})

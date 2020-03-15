import { frontRoute } from "../../../common/routes"
import { TAxiosSendProps } from "../../../common/types/common-types"
import { web_news_root_routes, web_news_routes } from "../../../common/web-routes"

export const newsList = (): TAxiosSendProps => ({ route: web_news_root_routes.list })
export const newsGet = (news_id: string): TAxiosSendProps => ({
  route: frontRoute(web_news_routes.get, { news_id }),
})

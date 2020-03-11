import { TAxiosSendProps } from "../../../common/types/common-types"
import { web_news_root_routes } from "../../../common/web-routes"

export const newsList = (): TAxiosSendProps => ({ route: web_news_root_routes.list })

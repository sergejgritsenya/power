import { frontRoute, news_root_routes, news_routes } from "../../../common/routes"
import { TAxiosSendProps } from "../../../common/types/common-types"
import { TNewsUpdateProps } from "../../../common/types/news-types"

export const newsList = (): TAxiosSendProps => ({ route: news_root_routes.list })

export const newsGet = (news_id: string): TAxiosSendProps => ({
  route: frontRoute(news_routes.get, { news_id }),
})

export const newsCreate = (data: TNewsUpdateProps): TAxiosSendProps => ({
  route: news_root_routes.create,
  data,
})

export const newsUpdate = (news_id: string, data: TNewsUpdateProps): TAxiosSendProps => ({
  route: frontRoute(news_routes.update, { news_id }),
  data,
})

export const newsUploadLogo = (news_id: string, file: File): TAxiosSendProps => {
  const data = new FormData()
  data.append("file", file)
  return {
    route: frontRoute(news_routes.upload, { news_id }),
    data,
  }
}
export const newsDeleteLogo = (news_id: string): TAxiosSendProps => ({
  route: frontRoute(news_routes.deleteLogo, { news_id }),
})

export const newsDelete = (news_id: string): TAxiosSendProps => ({
  route: news_root_routes.delete,
  data: { news_id },
})

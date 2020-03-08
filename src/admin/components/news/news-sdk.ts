import { AxiosInstance } from "axios"
import { frontRoute, news_root_routes, news_routes } from "../../../common/routes"
import { TNews, TNewsList, TNewsUpdateProps } from "../../../common/types/news-types"

export const newsList = async (axios: AxiosInstance) => {
  return await axios.post<TNewsList[]>(news_root_routes.list)
}
export const newsGet = async (axios: AxiosInstance, news_id: string) => {
  return await axios.post<TNews>(frontRoute(news_routes.get, { news_id }))
}
export const newsCreate = async (axios: AxiosInstance, data: TNewsUpdateProps) => {
  return await axios.post<string>(news_root_routes.create, data)
}
export const newsUpdate = async (axios: AxiosInstance, news_id: string, data: TNewsUpdateProps) => {
  return await axios.post<TNews>(frontRoute(news_routes.update, { news_id }), data)
}
export const newsDelete = async (axios: AxiosInstance, news_id: string) => {
  return await axios.post<TNewsList[]>(news_root_routes.delete, { news_id })
}

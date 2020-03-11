import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { TNewsList } from "../../../common/types/news-types"
import { WebNoElements } from "../common/no-elements"
import { newsList as webNewsList } from "./news-sdk"

type TNewsListData = AxiosResponse<TNewsList[]>
export const webNewsLoader: TChykLoadData<TNewsListData> = async (_, { axios }) =>
  axios.sendPost(webNewsList())
type TNewsListProps = TRouteComponentProps<TNewsListData>

export const WebNewsList: FC<TNewsListProps> = ({ data: news_list }) => {
  return (
    <>{news_list.length ? news_list.map(item => <div>{item.title}</div>) : <WebNoElements />}</>
  )
}

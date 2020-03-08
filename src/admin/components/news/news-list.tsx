import { Card, CardContent, CardHeader, Divider, Grid } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { TChykLoadData } from "../.."
import { ButtonLink } from "../../../common/front-sdk/button-link"
import { TNewsList } from "../../../common/types/news-types"
import { useAxios } from "../../layout/di-context"
import { ApplyRemoveDialog } from "../common/apply-remove-dialog"
import { ListModel } from "../common/list-model"
import { Locker } from "../common/locker"
import { NoElements } from "../common/no-elements"
import { newsDelete, newsList } from "./news-sdk"

type TNewsListData = AxiosResponse<TNewsList[]>
export const newsListLoader: TChykLoadData<TNewsListData> = async (_, { axios }) => newsList(axios)
type TNewsListProps = TRouteComponentProps<TNewsListData>

export const NewsList: FC<TNewsListProps> = ({ data }) => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const news_list = useMemo(() => {
    const model = new ListModel<TNewsList>({})
    model.setList(data)
    return model
  }, [])
  const deleteNews = async (news_id: string) => {
    news_list.setLoading(true)
    try {
      const res = await newsDelete(axios, news_id)
      news_list.setList(res.data)
      news_list.setLoading(false)
      enqueueSnackbar("Succesfully deleted", {
        variant: "success",
      })
    } catch (e) {
      news_list.setLoading(false)
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
            <CardHeader title="News List" />
          </Grid>
          <Grid item>
            <ButtonLink to="/news/create" color="primary">
              Create
            </ButtonLink>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={12} md={6} lg={4}>
            <h3>Title</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={4} />
          <Grid item xs={12} md={6} lg={4} />
        </Grid>
        <NewsListTable news_list={news_list} deleteNews={deleteNews} />
      </CardContent>
      <Locker show={news_list.is_loading} />
    </Card>
  )
}
type TNewsListTableProps = {
  news_list: ListModel<TNewsList>
  deleteNews: (news_id: string) => void
}
const NewsListTable: FC<TNewsListTableProps> = props => {
  const { news_list, deleteNews } = props
  return useObserver(() => (
    <div>
      {news_list.list.length ? (
        news_list.list.map(news => (
          <div key={news.id}>
            <Grid container justify="flex-start" alignItems="center" style={{ padding: "7px 0" }}>
              <Grid item xs={12} md={6} lg={4}>
                {news.title}
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ButtonLink to={`/news/${news.id}`}>More</ButtonLink>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ApplyRemoveDialog id={news.id} removeEntity={deleteNews} entity_name="news" />
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

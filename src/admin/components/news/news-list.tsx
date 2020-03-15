import { Avatar, Card, CardContent, CardHeader, Divider, Grid, makeStyles } from "@material-ui/core"
import Check from "@material-ui/icons/Check"
import Clear from "@material-ui/icons/Clear"
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
export const newsListLoader: TChykLoadData<TNewsListData> = async (_, { axios }) =>
  axios.sendPost<TNewsList[]>(newsList())
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
      const res = await axios.sendPost<TNewsList[]>(newsDelete(news_id))
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
            <CardHeader title="News list" />
          </Grid>
          <Grid item>
            <ButtonLink to="/news/create" color="primary">
              Create
            </ButtonLink>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={12} md={6} lg={2}>
            <h3>Logo</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h3>Title</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h3>Publish</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={2} />
          <Grid item xs={12} md={6} lg={2} />
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
  const classes = useStyles()
  return useObserver(() => (
    <div>
      {news_list.list.length ? (
        news_list.list.map(news => (
          <div key={news.id}>
            <Grid container justify="flex-start" alignItems="center" style={{ padding: "7px 0" }}>
              <Grid item xs={12} md={6} lg={2}>
                {news.logo ? (
                  <Avatar src={news.logo} variant="rounded" className={classes.avatar} />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                {news.title}
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                {news.publish ? <Check color="primary" /> : <Clear color="secondary" />}
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <ButtonLink to={`/news/${news.id}`}>More</ButtonLink>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
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

const useStyles = makeStyles(_theme => ({
  avatar: {
    width: "auto",
    display: "flex",
    justifyContent: "flex-start",
    "& img": {
      width: "auto",
      objectFit: "contain",
    },
  },
  // publish: {
  //   display: "flex",
  //   justifyContent: "center",
  // },
}))

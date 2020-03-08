import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { TChykLoadData } from "../.."
import { TNews } from "../../../common/types/news-types"
import { useAxios } from "../../layout/di-context"
import { Locker } from "../common/locker"
import { SaveButton } from "../common/save-button"
import { NewsModel } from "./news-model"
import { newsGet, newsUpdate } from "./news-sdk"

type TNewsData = AxiosResponse<TNews>
export const newsLoader: TChykLoadData<TNewsData, { id: string }> = async ({ match }, { axios }) =>
  axios.sendPost<TNews>(newsGet(match.params.id))

type TNewsProps = TRouteComponentProps<TNewsData>
export const News: FC<TNewsProps> = ({ data }) => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const news = useMemo(() => {
    const model = new NewsModel(data)
    return model
  }, [])
  const update = async () => {
    news.setLoading(true)
    try {
      const res = await axios.sendPost<TNews>(newsUpdate(news.id, news.json))
      news.updateAll(res.data)
      news.setLoading(false)
      enqueueSnackbar("Successfully saved", {
        variant: "success",
      })
    } catch (e) {
      news.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }
  return <NewsField news={news} update={update} />
}

type TNewsFieldProps = {
  news: NewsModel
  update: () => void
}
const NewsField: FC<TNewsFieldProps> = props => {
  const { news, update } = props
  return useObserver(() => (
    <Card>
      <CardHeader title={`News ${news.title}`} />
      <CardContent>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <TextField
              label="title"
              value={news.title}
              onChange={e => news.setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="text"
              value={news.text}
              onChange={e => news.setText(e.target.value)}
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        {news.validation && <SaveButton save={update} />}
      </CardContent>
      <Locker show={news.is_loading} />
    </Card>
  ))
}

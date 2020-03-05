import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import React, { FC, useMemo } from "react"
import { TChykLoadData } from "../.."
import { NewsModel } from "./news-model"

type TNewsData = {}
export const newsLoader: TChykLoadData<TNewsData, { id: string }> = async ({ match }, {}) => ({
  news_id: match.params.id,
})

type TNewsProps = TRouteComponentProps<TNewsData>
export const News: FC<TNewsProps> = ({ match }) => {
  const news = useMemo(() => {
    const model = new NewsModel({ id: match.params.id })
    return model
  }, [])
  return <NewsField news={news} />
}

type TNewsFieldProps = {
  news: NewsModel
}
const NewsField: FC<TNewsFieldProps> = props => {
  const { news } = props
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
      </CardContent>
    </Card>
  ))
}

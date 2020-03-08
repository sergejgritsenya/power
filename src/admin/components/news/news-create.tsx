import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { useAxios } from "../../layout/di-context"
import { Locker } from "../common/locker"
import { SaveButton } from "../common/save-button"
import { CreateNewsModel } from "./news-model"
import { newsCreate } from "./news-sdk"

export const NewsCreate: FC = () => {
  const axios = useAxios()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const news = useMemo(() => {
    const model = new CreateNewsModel({})
    return model
  }, [])
  const create = async () => {
    news.setLoading(true)
    try {
      const res = await axios.sendPost<string>(newsCreate(news.json))
      news.setLoading(false)
      enqueueSnackbar("Successfully created", {
        variant: "success",
      })
      history.replace(`/news/${res.data}`)
    } catch (e) {
      news.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }
  return useObserver(() => (
    <Card>
      <CardHeader title={`News: ${news.title}`} />
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
        {news.validation && <SaveButton save={create} />}
      </CardContent>
      <Locker show={news.is_loading} />
    </Card>
  ))
}

import { Grid, makeStyles } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { TNews } from "../../../common/types/news-types"
import { newsGet } from "./news-sdk"

type TNewsData = AxiosResponse<TNews>
export const webNewsLoader: TChykLoadData<TNewsData> = async ({ match }, { axios }) =>
  axios.sendPost(newsGet(match.params.news_id))
type TNewsProps = TRouteComponentProps<TNewsData>

export const WebNews: FC<TNewsProps> = ({ data: news }) => {
  const classes = useStyles()
  return (
    <Grid container justify="center" spacing={4} className={classes.superRoot}>
      <Grid item xs={12} md={6} className={classes.root}>
        <img src={news.logo || "/static/default-img.png"} className={classes.logo} />
      </Grid>
      <Grid item xs={12} md={6} className={classes.root}>
        <div className={classes.text}>{news.text}</div>
      </Grid>
      {/* {news.images.length ? (
          <Grid container justify="center" className={classes.superRoot}>
            {news.images.map(image => (
              <Grid item xs={12} md={6} className={classes.root} key={image.id}>
                <img src={image.url} className={classes.image} />
              </Grid>
            ))}
          </Grid>
        ) : null} */}
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  superRoot: {
    minHeight: "calc(100vh - 110px - 100px)",
    paddingTop: "30px",
    marginBottom: "15px",
  },
  root: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px",
  },
  logo: {
    width: "100%",
    // objectFit: "cover",
    height: "100%",
  },
  text: {
    fontSize: "20px",
    color: theme.palette.primary.light,
  },
}))

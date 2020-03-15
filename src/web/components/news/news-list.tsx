import { Grid, makeStyles } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { TWebNewsList } from "../../../common/types/news-types"
import { WebNoElements } from "../common/no-elements"
import { newsList as webNewsList } from "./news-sdk"

type TNewsListData = AxiosResponse<TWebNewsList[]>
export const webNewsListLoader: TChykLoadData<TNewsListData> = async (_, { axios }) =>
  axios.sendPost(webNewsList())
type TNewsListProps = TRouteComponentProps<TNewsListData>

export const WebNewsList: FC<TNewsListProps> = ({ data: newss }) => {
  const classes = useStyles()
  return (
    <Grid container justify="center" className={classes.superRoot}>
      {newss.length ? (
        newss.map(item => (
          <Grid
            item
            component="a"
            href={`/news/${item.id}`}
            key={item.id}
            className={classes.root}
            container
            xs={12}
          >
            <Grid item xs={12} md={3}>
              <img src={item.logo || "/static/default-img.png"} className={classes.image} />
            </Grid>
            <Grid item xs={12} md={9} className={classes.title}>
              {item.title}
            </Grid>
            <Grid item xs={12} md={9} className={classes.text}>
              {item.text.substr(0, 200) + "..."}
            </Grid>
          </Grid>
        ))
      ) : (
        <WebNoElements />
      )}
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
  title: {
    // alignItems: "center",
    // display: "flex",
    // justifyContent: "center",
    // paddingTop: "30px",
    fontSize: "40px",
    color: theme.palette.primary.light,
  },
  text: {
    // alignItems: "center",
    // display: "flex",
    // justifyContent: "center",
    // paddingTop: "30px",
    fontSize: "21px",
    color: theme.palette.primary.light,
  },
  image: {
    width: "200px",
  },
}))

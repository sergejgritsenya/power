import { Card, CardContent, CardHeader, Grid } from "@material-ui/core"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { ButtonLink } from "../../../common/front-sdk/button-link"

type TNewsListData = {}
export const newsListLoader: TChykLoadData<TNewsListData> = async (_, {}) => ({})

type TNewsListProps = TRouteComponentProps<TNewsListData>
export const NewsList: FC<TNewsListProps> = () => {
  return (
    <Card>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <CardHeader title="News List" />
        </Grid>
        <Grid item>
          <ButtonLink to="/news/create" color="primary">
            Create new news
          </ButtonLink>
        </Grid>
      </Grid>
      <CardContent>
        <h1>News List</h1>
      </CardContent>
    </Card>
  )
}

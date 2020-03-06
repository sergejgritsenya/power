import { Card, CardContent, CardHeader, Grid } from "@material-ui/core"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { ButtonLink } from "../../../common/front-sdk/button-link"

type TTournamentListData = {}
export const tournamentListLoader: TChykLoadData<TTournamentListData> = async (_, {}) => ({})

type TTournamentListProps = TRouteComponentProps<TTournamentListData>
export const TournamentList: FC<TTournamentListProps> = () => {
  return (
    <Card>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <CardHeader title="Tournament List" />
        </Grid>
        <Grid item>
          <ButtonLink to="/tournaments/create" color="primary">
            Create new tournament
          </ButtonLink>
        </Grid>
      </Grid>
      <CardContent>
        <h1>Tournament List</h1>
      </CardContent>
    </Card>
  )
}

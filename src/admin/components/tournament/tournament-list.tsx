import { Card, CardContent, CardHeader, Grid } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { TChykLoadData } from "../.."
import { ButtonLink } from "../../../common/front-sdk/button-link"
import { TTournamentList } from "../../../common/types/tournament-types"
import { useAxios } from "../../layout/di-context"
import { ApplyRemoveDialog } from "../common/apply-remove-dialog"
import { ListModel } from "../common/list-model"
import { NoElements } from "../common/no-elements"
import { tournamentDelete, tournamentList } from "./tournament-sdk"

type TTournamentListData = AxiosResponse<TTournamentList[]>
export const tournamentListLoader: TChykLoadData<TTournamentListData> = async (_, { axios }) =>
  tournamentList(axios)

type TTournamentListProps = TRouteComponentProps<TTournamentListData>
export const TournamentList: FC<TTournamentListProps> = ({ data }) => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const tournament_list = useMemo(() => {
    const model = new ListModel<TTournamentList>()
    model.setList(data)
    return model
  }, [])
  const deleteTournament = async (tournament_id: string) => {
    try {
      const res = await tournamentDelete(axios, tournament_id)
      tournament_list.setList(res.data)
      enqueueSnackbar("Succesfully deleted", {
        variant: "success",
      })
    } catch (e) {
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
            <CardHeader title="Tournament List" />
          </Grid>
          <Grid item>
            <ButtonLink to="/tournaments/create" color="primary">
              Create new tournament
            </ButtonLink>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={12} md={6} lg={3}>
            Logo
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            Name
          </Grid>
          <Grid item xs={12} md={6} lg={3} />
          <Grid item xs={12} md={6} lg={3} />
          <Grid item />
        </Grid>
        <TournamentListTable
          tournament_list={tournament_list}
          deleteTournament={deleteTournament}
        />
      </CardContent>
    </Card>
  )
}

type TTournamentListTableProps = {
  tournament_list: ListModel<TTournamentList>
  deleteTournament: (tournament_id: string) => void
}
const TournamentListTable: FC<TTournamentListTableProps> = ({
  tournament_list,
  deleteTournament,
}) => {
  return useObserver(() => (
    <div>
      {tournament_list.list.length ? (
        tournament_list.list.map(tournament => (
          <div key={tournament.id}>
            <Grid container justify="flex-start" alignItems="center">
              <Grid item xs={12} md={6} lg={3}>
                {tournament.logo || ""}
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                {tournament.name}
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <ButtonLink to={`tournaments/${tournament.id}`}>More</ButtonLink>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <ApplyRemoveDialog
                  id={tournament.id}
                  removeEntity={deleteTournament}
                  entity_name="tournament"
                />
              </Grid>
            </Grid>
          </div>
        ))
      ) : (
        <NoElements />
      )}
    </div>
  ))
}

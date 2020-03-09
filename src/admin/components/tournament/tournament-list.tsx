import { Avatar, Card, CardContent, CardHeader, Divider, Grid, makeStyles } from "@material-ui/core"
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
import { Locker } from "../common/locker"
import { NoElements } from "../common/no-elements"
import { tournamentDelete, tournamentList } from "./tournament-sdk"

type TTournamentListData = AxiosResponse<TTournamentList[]>
export const tournamentListLoader: TChykLoadData<TTournamentListData> = async (_, { axios }) =>
  axios.sendPost<TTournamentList[]>(tournamentList())

type TTournamentListProps = TRouteComponentProps<TTournamentListData>
export const TournamentList: FC<TTournamentListProps> = ({ data }) => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const tournament_list = useMemo(() => {
    const model = new ListModel<TTournamentList>({})
    model.setList(data)
    return model
  }, [])
  const deleteTournament = async (tournament_id: string) => {
    tournament_list.setLoading(true)
    try {
      const res = await axios.sendPost<TTournamentList[]>(tournamentDelete(tournament_id))
      tournament_list.setList(res.data)
      tournament_list.setLoading(false)
      enqueueSnackbar("Succesfully deleted", {
        variant: "success",
      })
    } catch (e) {
      tournament_list.setLoading(false)
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
            <CardHeader title="Tournament list" />
          </Grid>
          <Grid item>
            <ButtonLink to="/tournaments/create" color="primary">
              Create
            </ButtonLink>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={12} md={6} lg={2}>
            <h3>Logo</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <h3>Name</h3>
          </Grid>
          <Grid item xs={12} md={6} lg={3} />
          <Grid item xs={12} md={6} lg={3} />
        </Grid>
        <TournamentListTable
          tournament_list={tournament_list}
          deleteTournament={deleteTournament}
        />
        <Locker show={tournament_list.is_loading} />
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
  const classes = useStyles()
  return useObserver(() => (
    <div>
      {tournament_list.list.length ? (
        tournament_list.list.map(tournament => (
          <div key={tournament.id}>
            <Grid container justify="flex-start" alignItems="center" style={{ padding: "7px 0" }}>
              <Grid item xs={12} md={6} lg={2}>
                {tournament.logo ? (
                  <Avatar src={tournament.logo} variant="rounded" className={classes.avatar} />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
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
}))

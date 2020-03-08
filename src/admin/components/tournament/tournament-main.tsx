import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC } from "react"
import { TTournament } from "../../../common/types/tournament-types"
import { useAxios } from "../../layout/di-context"
import { Locker } from "../common/locker"
import { SaveButton } from "../common/save-button"
import { useTournamentContext } from "./tournament"
import { TournamentModel } from "./tournament-model"
import { tournamentUpdate } from "./tournament-sdk"

export const TournamentMain: FC = () => {
  const tournament = useTournamentContext()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const update = async () => {
    tournament.setLoading(true)
    try {
      const res = await axios.sendPost<TTournament>(
        tournamentUpdate(tournament.id, tournament.json)
      )
      tournament.updateAll(res.data)
      tournament.setLoading(false)
      enqueueSnackbar("Successfully saved", {
        variant: "success",
      })
    } catch (e) {
      tournament.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }
  return <TournamentField tournament={tournament} update={update} />
}

type TTournamentFieldProps = {
  tournament: TournamentModel
  update: () => void
}
const TournamentField: FC<TTournamentFieldProps> = props => {
  const { tournament, update } = props
  return useObserver(() => (
    <Card>
      <CardHeader title={`Tournament ${tournament.name}`} />
      <CardContent>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <TextField
              label="name"
              value={tournament.name}
              onChange={e => tournament.setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="description"
              value={tournament.description}
              onChange={e => tournament.setDescription(e.target.value)}
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        {tournament.validation && <SaveButton save={update} />}
      </CardContent>
      <Locker show={tournament.is_loading} />
    </Card>
  ))
}

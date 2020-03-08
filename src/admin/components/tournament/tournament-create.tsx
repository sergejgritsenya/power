import { Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { useAxios } from "../../layout/di-context"
import { Locker } from "../common/locker"
import { SaveButton } from "../common/save-button"
import { CreateTournamentModel } from "./tournament-model"
import { tournamentCreate } from "./tournament-sdk"

export const TournamentCreate: FC = () => {
  const axios = useAxios()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const tournament = useMemo(() => {
    const model = new CreateTournamentModel({})
    return model
  }, [])
  const create = async () => {
    tournament.setLoading(true)
    try {
      const res = await tournamentCreate(axios, tournament.json)
      tournament.setLoading(false)
      enqueueSnackbar("Successfully created", {
        variant: "success",
      })
      history.replace(`/tournaments/${res.data}`)
    } catch (e) {
      tournament.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
      throw e
    }
  }
  return useObserver(() => (
    <Card>
      <CardHeader title={`Create new tournament: ${tournament.name}`} />
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
        {tournament.validation && <SaveButton save={create} />}
      </CardContent>
      <Locker show={tournament.is_loading} />
    </Card>
  ))
}

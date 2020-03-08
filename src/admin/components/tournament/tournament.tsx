import { Card, CardContent, CardHeader, Grid, Tab, Tabs, TextField } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import { default as React, FC, useMemo, useState } from "react"
import { TChykLoadData } from "../.."
import { TTournament } from "../../../common/types/tournament-types"
import { useAxios } from "../../layout/di-context"
import { Locker } from "../common/locker"
import { SaveButton } from "../common/save-button"
import { ImagesList } from "./images-list"
import { TournamentModel } from "./tournament-model"
import { tournamentGet, tournamentUpdate } from "./tournament-sdk"
import { VideosList } from "./videos-list"

type TTournamentData = AxiosResponse<TTournament>
export const tournamentLoader: TChykLoadData<TTournamentData, { id: string }> = async (
  { match },
  { axios }
) => tournamentGet(axios, match.params.id)

type TTournamentProps = TRouteComponentProps<TTournamentData>
export const Tournament: FC<TTournamentProps> = ({ data }) => {
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const [value, setValue] = useState<number>(0)
  const tournament = useMemo(() => {
    const model = new TournamentModel(data)
    return model
  }, [])
  const update = async () => {
    tournament.setLoading(true)
    try {
      const res = await tournamentUpdate(axios, tournament.id, tournament.json)
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
  return (
    <>
      <Tabs value={value} onChange={(_, val) => setValue(val)}>
        <Tab value={0} label="Main" />
        <Tab value={1} label="Images" />
        <Tab value={2} label="Video" />
      </Tabs>
      {value === 0 && <TournamentField tournament={tournament} update={update} />}
      {value === 1 && <ImagesList />}
      {value === 2 && <VideosList />}
    </>
  )
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

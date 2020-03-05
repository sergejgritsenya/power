import { Card, CardContent, CardHeader, Grid, Tab, Tabs, TextField } from "@material-ui/core"
import { TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import { default as React, FC, useMemo, useState } from "react"
import { TChykLoadData } from "../.."
import { ImagesList } from "./images-list"
import { TournamentModel } from "./tournament-model"
import { VideosList } from "./videos-list"

type TTournamentData = {}
export const tournamentLoader: TChykLoadData<TTournamentData, { id: string }> = async (
  { match },
  {}
) => ({
  tournament_id: match.params.id,
})

type TTournamentProps = TRouteComponentProps<TTournamentData>
export const Tournament: FC<TTournamentProps> = ({ match }) => {
  const [value, setValue] = useState<number>(0)
  const tournament = useMemo(() => {
    const model = new TournamentModel({ id: match.params.id })
    return model
  }, [])
  return (
    <>
      <Tabs value={value} onChange={(_, val) => setValue(val)}>
        <Tab value={0} label="Main" />
        <Tab value={1} label="Images" />
        <Tab value={2} label="Video" />
      </Tabs>
      {value === 0 && <TournamentField tournament={tournament} />}
      {value === 1 && <ImagesList />}
      {value === 2 && <VideosList />}
    </>
  )
}

type TTournamentFieldProps = {
  tournament: TournamentModel
}
const TournamentField: FC<TTournamentFieldProps> = props => {
  const { tournament } = props
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
      </CardContent>
    </Card>
  ))
}

import { Tab, Tabs } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import { createContext, default as React, FC, useContext, useMemo, useState } from "react"
import { TChykLoadData } from "../.."
import { TTournament } from "../../../common/types/tournament-types"
import { ImagesList } from "./images-list"
import { TournamentMain } from "./tournament-main"
import { TournamentModel } from "./tournament-model"
import { tournamentGet } from "./tournament-sdk"
import { VideosList } from "./videos-list"

type TTournamentData = AxiosResponse<TTournament>
export const tournamentLoader: TChykLoadData<TTournamentData, { id: string }> = async (
  { match },
  { axios }
) => axios.sendPost<TTournament>(tournamentGet(match.params.id))

const TournamentContext = createContext<TournamentModel>(null as any)
export const useTournamentContext = () => useContext(TournamentContext)

type TTournamentProps = TRouteComponentProps<TTournamentData>
export const Tournament: FC<TTournamentProps> = ({ data }) => {
  const [value, setValue] = useState<number>(0)
  const tournament = useMemo(() => {
    const model = new TournamentModel(data)
    return model
  }, [])
  return (
    <TournamentContext.Provider value={tournament}>
      <Tabs value={value} onChange={(_, val) => setValue(val)}>
        <Tab value={0} label="Main" />
        <Tab value={1} label="Images" />
        <Tab value={2} label="Video" />
      </Tabs>
      {value === 0 && <TournamentMain />}
      {value === 1 && <ImagesList />}
      {value === 2 && <VideosList />}
    </TournamentContext.Provider>
  )
}

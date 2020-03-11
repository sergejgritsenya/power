import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { TTournamentList } from "../../../common/types/tournament-types"
import { WebNoElements } from "../common/no-elements"
import { tournamentList } from "./tournament-sdk"

type TTournamentListData = AxiosResponse<TTournamentList[]>
export const webTournamentLoader: TChykLoadData<TTournamentListData> = async (_, { axios }) =>
  axios.sendPost(tournamentList())
type TTournamentListProps = TRouteComponentProps<TTournamentListData>

export const WebTournamentList: FC<TTournamentListProps> = ({ data: tournaments }) => {
  return (
    <>{tournaments.length ? tournaments.map(item => <div>{item.name}</div>) : <WebNoElements />}</>
  )
}

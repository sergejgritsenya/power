import { AxiosInstance } from "axios"
import { frontRoute, tournament_root_routes, tournament_routes } from "../../../common/routes"
import {
  TTournament,
  TTournamentList,
  TTournamentUpdateProps,
} from "../../../common/types/tournament-types"

export const tournamentList = async (axios: AxiosInstance) => {
  return await axios.post<TTournamentList[]>(tournament_root_routes.list)
}
export const tournamentGet = async (axios: AxiosInstance, tournament_id: string) => {
  return await axios.post<TTournament>(frontRoute(tournament_routes.get, { tournament_id }))
}
export const tournamentCreate = async (axios: AxiosInstance, data: TTournamentUpdateProps) => {
  return await axios.post<string>(tournament_root_routes.create, data)
}
export const tournamentUpdate = async (
  axios: AxiosInstance,
  tournament_id: string,
  data: TTournamentUpdateProps
) => {
  return await axios.post<TTournament>(
    frontRoute(tournament_routes.update, { tournament_id }),
    data
  )
}
export const tournamentDelete = async (axios: AxiosInstance, tournament_id: string) => {
  return await axios.post<TTournamentList[]>(tournament_root_routes.delete, { tournament_id })
}

import { frontRoute, tournament_root_routes, tournament_routes } from "../../../common/routes"
import { TAxiosSendProps } from "../../../common/types/common-types"
import { TTournamentUpdateProps } from "../../../common/types/tournament-types"

export const tournamentList = (): TAxiosSendProps => ({ route: tournament_root_routes.list })

export const tournamentGet = (tournament_id: string): TAxiosSendProps => ({
  route: frontRoute(tournament_routes.get, { tournament_id }),
})

export const tournamentCreate = (data: TTournamentUpdateProps): TAxiosSendProps => ({
  route: tournament_root_routes.create,
  data,
})

export const tournamentUpdate = (
  tournament_id: string,
  data: TTournamentUpdateProps
): TAxiosSendProps => ({ route: frontRoute(tournament_routes.update, { tournament_id }), data })

export const tournamentDelete = (tournament_id: string): TAxiosSendProps => ({
  route: tournament_root_routes.delete,
  data: { tournament_id },
})

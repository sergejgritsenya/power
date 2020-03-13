import { frontRoute } from "../../../common/routes"
import { TAxiosSendProps } from "../../../common/types/common-types"
import { web_tournament_root_routes, web_tournament_routes } from "../../../common/web-routes"

export const tournamentList = (): TAxiosSendProps => ({ route: web_tournament_root_routes.list })
export const tournamentGet = (tournament_id: string): TAxiosSendProps => ({
  route: frontRoute(web_tournament_routes.get, { tournament_id }),
})

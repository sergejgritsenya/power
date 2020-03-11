import { TAxiosSendProps } from "../../../common/types/common-types"
import { web_tournament_root_routes } from "../../../common/web-routes"

export const tournamentList = (): TAxiosSendProps => ({ route: web_tournament_root_routes.list })

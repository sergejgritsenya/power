import {
  frontRoute,
  tournament_image_routes,
  tournament_root_routes,
  tournament_routes,
  tournament_video_routes,
} from "../../../common/routes"
import { TAxiosSendProps } from "../../../common/types/common-types"
import {
  TTournamentUpdateProps,
  TTournamentVideoCreateProps,
} from "../../../common/types/tournament-types"

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

export const tournamentUploadLogo = (tournament_id: string, file: File): TAxiosSendProps => {
  const data = new FormData()
  data.append("file", file)
  return {
    route: frontRoute(tournament_routes.upload, { tournament_id }),
    data,
  }
}
export const tournamentDeleteLogo = (tournament_id: string): TAxiosSendProps => ({
  route: frontRoute(tournament_routes.deleteLogo, { tournament_id }),
})

export const tournamentDelete = (tournament_id: string): TAxiosSendProps => ({
  route: tournament_root_routes.delete,
  data: { tournament_id },
})

export const tournamentVideoCreate = (
  tournament_id: string,
  data: TTournamentVideoCreateProps
): TAxiosSendProps => ({
  route: frontRoute(tournament_video_routes.create, { tournament_id }),
  data,
})
export const tournamentVideoDelete = (
  tournament_id: string,
  video_id: string
): TAxiosSendProps => ({
  route: frontRoute(tournament_video_routes.delete, { tournament_id }),
  data: { video_id },
})
export const tournamentImageUpload = (tournament_id: string, file: File): TAxiosSendProps => {
  const data = new FormData()
  data.append("file", file)
  return {
    route: frontRoute(tournament_image_routes.upload, { tournament_id }),
    data,
  }
}
export const tournamentImageDelete = (
  tournament_id: string,
  image_id: string
): TAxiosSendProps => ({
  route: frontRoute(tournament_image_routes.delete, { tournament_id }),
  data: { image_id },
})

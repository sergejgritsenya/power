import { inject, injectable } from "inversify"
import Router from "koa-router"
import { tournament_root_routes, tournament_routes } from "../../common/routes"
import { TTournamentUpdateProps } from "../../common/types/tournament-types"
import { TournamentService } from "./tournament-service"

@injectable()
export class TournamentRouter {
  tournament_router = new Router()
  constructor(@inject(TournamentService) private readonly tournament_service: TournamentService) {
    this.tournament_router.post(tournament_root_routes.list, async ctx => {
      ctx.body = await this.tournament_service.list()
    })
    this.tournament_router.post(tournament_root_routes.create, async ctx => {
      const data = ctx.request.body as TTournamentUpdateProps
      ctx.body = await tournament_service.create(data)
    })
    this.tournament_router.post(tournament_root_routes.delete, async ctx => {
      const { tournament_id } = ctx.request.body as { tournament_id: string }
      ctx.body = await tournament_service.deleteTournament(tournament_id)
    })
    this.tournament_router.post(tournament_routes.get, async ctx => {
      const tournament_id = ctx.params.tournament_id
      ctx.body = await this.tournament_service.getTournament(tournament_id)
    })
    this.tournament_router.post(tournament_routes.update, async ctx => {
      const tournament_id = ctx.params.tournament_id
      const data = ctx.request.body as TTournamentUpdateProps
      ctx.body = await tournament_service.update(tournament_id, data)
    })
  }
}

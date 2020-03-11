import { inject, injectable } from "inversify"
import Router from "koa-router"
import { web_tournament_root_routes, web_tournament_routes } from "../../common/web-routes"
import { TournamentService } from "./tournament-service"

@injectable()
export class WebTournamentRouter {
  tournament_router = new Router()
  constructor(
    @inject(TournamentService) private readonly tournamentService: TournamentService // @inject(TournamentImageRouter) private readonly imageRouter: TournamentImageRouter, // @inject(TournamentVideoRouter) private readonly videoRouter: TournamentVideoRouter
  ) {
    this.tournament_router.post(web_tournament_root_routes.list, async ctx => {
      ctx.body = await this.tournamentService.list()
    })
    this.tournament_router.post(web_tournament_routes.get, async ctx => {
      const { tournament_id } = ctx.params
      ctx.body = await this.tournamentService.getTournament(tournament_id)
    })
    // this.tournament_router.use(
    //   this.imageRouter.image_router.routes() as Middleware,
    //   this.imageRouter.image_router.allowedMethods() as Middleware
    // )
    // this.tournament_router.use(
    //   this.videoRouter.video_router.routes() as Middleware,
    //   this.videoRouter.video_router.allowedMethods() as Middleware
    // )
  }
}

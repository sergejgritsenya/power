import { inject, injectable } from "inversify"
import { Middleware } from "koa"
import Router from "koa-router"
import { WebNewsRouter } from "../news/web-news-router"
import { WebTournamentRouter } from "../tournament/web-tournament-router"

@injectable()
export class WebRouter {
  web_router = new Router()
  constructor(
    @inject(WebTournamentRouter) private readonly tournamentRouter: WebTournamentRouter,
    @inject(WebNewsRouter) private readonly newsRouter: WebNewsRouter
  ) {
    this.web_router.use(
      this.tournamentRouter.tournament_router.routes() as Middleware,
      this.tournamentRouter.tournament_router.allowedMethods() as Middleware
    )
    this.web_router.use(
      this.newsRouter.news_router.routes() as Middleware,
      this.newsRouter.news_router.allowedMethods() as Middleware
    )
  }
}

import { inject, injectable } from "inversify"
import Router from "koa-router"
import { news_root_routes, news_routes } from "../../common/routes"
import { TNewsUpdateProps } from "../../common/types/news-types"
import { NewsService } from "./news-service"

@injectable()
export class NewsRouter {
  news_router = new Router()
  constructor(@inject(NewsService) private readonly newsService: NewsService) {
    this.news_router.post(news_root_routes.list, async ctx => {
      ctx.body = await this.newsService.list()
    })
    this.news_router.post(news_root_routes.create, async ctx => {
      const data = ctx.request.body as TNewsUpdateProps
      ctx.body = await this.newsService.create(data)
    })
    this.news_router.post(news_root_routes.delete, async ctx => {
      const { news_id } = ctx.request.body as { news_id: string }
      ctx.body = await this.newsService.deleteNews(news_id)
    })
    this.news_router.post(news_routes.get, async ctx => {
      const news_id = ctx.params.news_id
      ctx.body = await this.newsService.getNews(news_id)
    })
    this.news_router.post(news_routes.update, async ctx => {
      const news_id = ctx.params.news_id
      const data = ctx.request.body as TNewsUpdateProps
      ctx.body = await this.newsService.update(news_id, data)
    })
  }
}
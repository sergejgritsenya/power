import { PrismaClient } from "@prisma/client"
import { inject, injectable } from "inversify"
import { TNews, TNewsList, TNewsUpdateProps } from "../../common/types/news-types"
import { PrismaService } from "../server/prisma-service"

@injectable()
export class NewsService {
  prisma: PrismaClient
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.prisma = this.prismaService.prisma
  }
  list = async (): Promise<TNewsList[]> => {
    const news_list = await this.prisma.news.findMany({
      select: { id: true, title: true },
      orderBy: { created_at: "asc" },
    })
    return news_list
  }
  getNews = async (id: string): Promise<TNews> => {
    const news = await this.prisma.news.findOne({
      where: { id },
      select: { id: true, title: true, text: true },
    })
    if (!news) {
      throw new Error("Unknown news")
    }
    return news
  }
  create = async (data: TNewsUpdateProps): Promise<string> => {
    const news = await this.prisma.news.create({ data })
    return news.id
  }
  update = async (id: string, data: TNewsUpdateProps): Promise<TNews> => {
    const news = await this.prisma.news.update({
      where: { id },
      data,
      select: { id: true, title: true, text: true },
    })
    return news
  }
  deleteNews = async (id: string): Promise<TNewsList[]> => {
    await this.prisma.news.delete({ where: { id } })
    const news_list = await this.prisma.news.findMany({
      select: { id: true, title: true },
      orderBy: { created_at: "asc" },
    })
    return news_list
  }
}

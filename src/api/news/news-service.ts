import { PrismaClient } from "@prisma/client"
import { IncomingMessage } from "http"
import { inject, injectable } from "inversify"
import { TNews, TNewsList, TNewsUpdateProps, TWebNewsList } from "../../common/types/news-types"
import { PrismaService } from "../server/prisma-service"
import { uploadToS3 } from "../upload-file/upload-to-s3"

@injectable()
export class NewsService {
  prisma: PrismaClient
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.prisma = this.prismaService.prisma
  }
  list = async (): Promise<TNewsList[]> => {
    const news_list = await this.prisma.news.findMany({
      select: { id: true, title: true, publish: true, logo: true },
      orderBy: { created_at: "asc" },
    })
    return news_list
  }
  getNews = async (id: string): Promise<TNews> => {
    const news = await this.prisma.news.findOne({
      where: { id },
      select: { id: true, title: true, publish: true, logo: true, text: true },
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
      select: { id: true, title: true, publish: true, logo: true, text: true },
    })
    return news
  }
  uploadLogo = async (id: string, req: IncomingMessage): Promise<string> => {
    const filename = await uploadToS3(req)
    const logo = await this.prisma.news
      .update({
        where: { id },
        data: { logo: filename },
        select: { logo: true },
      })
      .then(r => r.logo || "")
    return logo
  }
  deleteLogo = async (id: string) => {
    await this.prisma.news.update({
      where: { id },
      data: { logo: null },
    })
  }
  deleteNews = async (id: string): Promise<TNewsList[]> => {
    await this.prisma.news.delete({ where: { id } })
    const news_list = await this.prisma.news.findMany({
      select: { id: true, title: true, publish: true, logo: true },
      orderBy: { created_at: "asc" },
    })
    return news_list
  }
  webList = async (): Promise<TWebNewsList[]> => {
    const news_list = await this.prisma.news.findMany({
      where: { publish: true },
      select: { id: true, title: true, publish: true, logo: true, text: true },
      orderBy: { created_at: "asc" },
    })
    return news_list
  }
}

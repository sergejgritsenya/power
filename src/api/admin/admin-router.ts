import Router = require("koa-router")
import { inject, injectable } from "inversify"
import { PrismaService } from "../server/prisma-service"

@injectable()
export class AdminRouter {
  admin_router = new Router()
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.admin_router.post("/list", async ctx => {
      const admin_list = await this.prismaService.prisma.admin.findMany()
      ctx.body = admin_list
    })
  }
}

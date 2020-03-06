import Router = require("koa-router")
import { inject, injectable } from "inversify"
import { admin_root_routes } from "../../common/routes"
import { TAdminList } from "../../common/types/admin-types"
import { PrismaService } from "../server/prisma-service"

@injectable()
export class AdminRouter {
  admin_router = new Router()
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.admin_router.post(admin_root_routes.list, async ctx => {
      const admin_list: TAdminList[] = await this.prismaService.prisma.admin.findMany({
        select: { id: true, name: true, email: true },
      })
      ctx.body = admin_list
    })
  }
}

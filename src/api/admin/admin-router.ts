import Router = require("koa-router")
import { genSaltSync, hashSync } from "bcryptjs"
import { inject, injectable } from "inversify"
import { admin_root_routes, admin_routes } from "../../common/routes"
import {
  default_admin,
  TAdmin,
  TAdminCreateProps,
  TAdminList,
  TAdminUpdateProps,
} from "../../common/types/admin-types"
import { CREATE_ID } from "../../common/types/common-types"
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
    this.admin_router.post(admin_root_routes.create, async ctx => {
      const admin_create_data = ctx.request.body as TAdminCreateProps
      const data = {
        name: admin_create_data.name,
        email: admin_create_data.email,
      }
      const salt = genSaltSync(16)
      const password = hashSync(admin_create_data.password, salt)
      const db_admin = await this.prismaService.prisma.admin.create({
        data: { ...data, salt: { create: { salt } }, password: { create: { password } } },
        select: { id: true, name: true, email: true },
      })
      if (!db_admin) {
        throw new Error("Unknown admin")
      }
      const admin: TAdmin = db_admin
      ctx.body = admin
    })
    this.admin_router.post(admin_routes.get, async ctx => {
      const admin_id = ctx.params.admin_id
      if (admin_id === CREATE_ID) {
        ctx.body = default_admin
      } else {
        const db_admin = await this.prismaService.prisma.admin.findOne({
          where: { id: admin_id },
          select: { id: true, name: true, email: true },
        })
        if (!db_admin) {
          throw new Error("Unknown admin")
        }
        const admin: TAdmin = db_admin
        ctx.body = admin
      }
    })
    this.admin_router.post(admin_routes.update, async ctx => {
      const admin_id = ctx.params.admin_id
      const data = ctx.request.body as TAdminUpdateProps
      const db_admin = await this.prismaService.prisma.admin.update({
        where: { id: admin_id },
        data: data,
        select: { id: true, name: true, email: true },
      })
      if (!db_admin) {
        throw new Error("Unknown admin")
      }
      const admin: TAdmin = db_admin
      ctx.body = admin
    })
  }
}

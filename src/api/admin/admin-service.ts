import { PrismaClient } from "@prisma/client"
import { genSaltSync, hashSync } from "bcryptjs"
import { inject, injectable } from "inversify"
import {
  TAdmin,
  TAdminCreateProps,
  TAdminList,
  TAdminUpdateProps,
} from "../../common/types/admin-types"
import { PrismaService } from "../server/prisma-service"

@injectable()
export class AdminService {
  private prisma: PrismaClient
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.prisma = this.prismaService.prisma
  }
  list = async (): Promise<TAdminList[]> => {
    return await this.prisma.admin.findMany({
      select: { id: true, name: true, email: true },
    })
  }
  getAdmin = async (id: string): Promise<TAdmin> => {
    const admin = await this.prisma.admin.findOne({
      where: { id },
      select: { id: true, name: true, email: true },
    })
    if (!admin) {
      throw new Error("Unknown admin")
    }
    return admin
  }
  create = async (data: TAdminCreateProps): Promise<string> => {
    try {
      if (data.password !== data.confirm_password) {
        throw new Error("Passwords doesn't match")
      }
      const create_data = {
        name: data.name,
        email: data.email,
      }
      const salt = genSaltSync(16)
      const password = hashSync(data.password, salt)
      const admin = await this.prisma.admin.create({
        data: { ...create_data, salt: { create: { salt } }, password: { create: { password } } },
        select: { id: true },
      })
      return admin.id
    } catch (e) {
      throw e
    }
  }
  update = async (id: string, data: TAdminUpdateProps): Promise<TAdmin> => {
    const admin = await this.prisma.admin.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true },
    })
    if (!admin) {
      throw new Error("Unknown admin")
    }
    return admin
  }
  deleteAdmin = async (id: string): Promise<TAdminList[]> => {
    console.log(id)
    await this.prisma.adminSalt.deleteMany({ where: { admin: { id } } })
    await this.prisma.adminPassword.deleteMany({ where: { admin: { id } } })
    await this.prisma.admin.delete({ where: { id } })
    return await this.prisma.admin.findMany({
      select: { id: true, name: true, email: true },
    })
  }
}

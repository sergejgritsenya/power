import { PrismaClient } from "@prisma/client"
import { compare } from "bcryptjs"
import { inject, injectable } from "inversify"
import { TAuth, TAuthProps } from "../../common/types/auth-types"
import { PrismaService } from "../server/prisma-service"
import { generateTokens } from "../util/generate-token"

@injectable()
export class AuthService {
  prisma: PrismaClient
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.prisma = this.prismaService.prisma
  }
  adminLogin = async (props: TAuthProps): Promise<TAuth> => {
    const admin = await this.prisma.admin.findOne({
      where: { login: props.login },
      select: { id: true, login: true, email: true },
    })
    if (!admin) {
      throw new Error("admin not found")
    }
    const password = await this.prisma.admin
      .findOne({ where: { login: props.login } })
      .password({ select: { password: true } })
    if (!password) {
      throw new Error("password not found")
    }
    const pass_valid = await compare(props.password, password.password)
    const { access_token, refresh_token } = generateTokens(admin.id)
    if (!pass_valid) {
      throw new Error("pair doesn't match")
    }
    return { access_token, refresh_token }
  }
}

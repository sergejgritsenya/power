import { Middleware } from "koa"
import { EAuthKey } from "../../common/types/auth-types"
import { api_env } from "./env"

export const cors: Middleware = async (ctx, next) => {
  const { res } = ctx
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  await next()
}
export const authMidlleware: Middleware = async (ctx, next) => {
  const JWT_SERET_ADMIN = api_env.JWT_SERET_ADMIN
  ctx.get(EAuthKey.admin)
  await next()
}

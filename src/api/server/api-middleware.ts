import { JsonWebTokenError, verify } from "jsonwebtoken"
import { Middleware } from "koa"
import { EAuthKey } from "../../common/types/auth-types"
import { TAuthContext } from "./context"
import { api_env } from "./env"

export const cors: Middleware = async (ctx, next) => {
  const { res } = ctx
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST")
  res.setHeader("Access-Control-Allow-Headers", "*")
  await next()
}
export const authMidlleware: Middleware<{}, TAuthContext> = async (ctx, next) => {
  try {
    const JWT_SECRET_ADMIN = api_env.JWT_SECRET_ADMIN
    const admin_token = ctx.get(EAuthKey.admin)
    const admin_payload =
      admin_token && (verify(admin_token, JWT_SECRET_ADMIN) as { admin_id: string })
    ctx.admin_id = admin_payload ? admin_payload.admin_id : undefined
    await next()
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
    } else {
      console.error(e)
      throw e
    }
  }
}

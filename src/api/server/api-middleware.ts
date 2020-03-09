import { Middleware } from "koa"
import { EAuthKey } from "../../common/types/auth-types"
import { api_env } from "./env"

export const cors: Middleware = async (ctx, next) => {
  const { res } = ctx
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST")
  res.setHeader("Access-Control-Allow-Headers", "*")
  await next()
}
export const authMidlleware: Middleware = async (ctx, next) => {
  try {
    const JWT_SECRET_ADMIN = api_env.JWT_SECRET_ADMIN
    const admin_token = ctx.get(EAuthKey.admin)
    console.log("admin_token", JWT_SECRET_ADMIN)
    // const admin_payload =
    //   admin_token && (verify(admin_token, JWT_SECRET_ADMIN) as { admin_id: string })
    // console.log("admin_payload", admin_payload)
    await next()
  } catch (e) {
    console.log(e)
    throw e
  }
}

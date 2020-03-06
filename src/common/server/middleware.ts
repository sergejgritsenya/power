import { Middleware } from "koa"

export const errorMiddleware: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit("error", err, ctx)
  }
}

export const koaOnError = (err: any) => {
  console.error(err)
}

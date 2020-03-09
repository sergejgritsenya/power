import { sign } from "jsonwebtoken"
import { api_env } from "../server/env"
import { generateRandomStringToken } from "./generate-random-string"

const JWT_SECRET_ADMIN = api_env.JWT_SECRET_ADMIN

const ACCESS_TOKEN_EXP_IN_SEC = 15 * 60

export const generateTokens = (id: string) => {
  const refresh_token = generateRandomStringToken()
  return {
    access_token: sign({ admin_id: id }, JWT_SECRET_ADMIN, { expiresIn: ACCESS_TOKEN_EXP_IN_SEC }),
    refresh_token,
  }
}

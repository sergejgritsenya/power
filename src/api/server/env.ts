type TEnv = {
  API_PORT: number
  WDS_PORT: number
  NODE_ENV: string
  IS_PROD: boolean
}

export const Env: TEnv = {
  API_PORT: Number(process.env) || 3088,
  WDS_PORT: Number(process.env.WDS_PORT) || 3089,
  NODE_ENV: process.env.NODE_ENV || "production",
  IS_PROD: process.env.NODE_ENV === "production",
}

export type TApiEnv = {
  API_PORT: number
  WDS_PORT: number
  NODE_ENV: string
  IS_PROD: boolean
  S3_KEY: string
  S3_SECRET: string
  S3_IMAGES_BUCKET: string
  JWT_SECRET_ADMIN: string
}

export const api_env: TApiEnv = {
  API_PORT: Number(process.env.API_PORT) || 3088,
  WDS_PORT: Number(process.env.WDS_PORT) || 3089,
  NODE_ENV: process.env.NODE_ENV || "production",
  IS_PROD: process.env.NODE_ENV === "production",
  S3_KEY: process.env.S3_KEY || "",
  S3_SECRET: process.env.S3_SECRET || "",
  S3_IMAGES_BUCKET: process.env.S3_IMAGES_BUCKET || "",
  JWT_SECRET_ADMIN: process.env.JWT_SECRET_ADMIN || "",
}

type TWebEnv = {
  WDS_PORT: number | undefined
  IS_PROD: boolean
  WEB_PORT: number
  API_URL: string
}
export const webEnv: TWebEnv = {
  WDS_PORT: process.env.WDS_PORT ? Number(process.env.WDS_PORT) : undefined,
  IS_PROD: process.env.NODE_ENV === "production",
  WEB_PORT: Number(process.env.WEB_PORT) || 3086,
  API_URL: process.env.API_URL
    ? process.env.API_URL
    : process.env.API_PORT
    ? `http://localhost:${process.env.API_PORT}`
    : "http://localhost:3088",
}

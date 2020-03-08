type TAdminEnv = {
  WDS_PORT: number | undefined
  IS_PROD: boolean
  ADMIN_PORT: number
  API_URL: string
}
export const adminEnv: TAdminEnv = {
  WDS_PORT: process.env.WDS_PORT ? Number(process.env.WDS_PORT) : undefined,
  IS_PROD: process.env.NODE_ENV === "production",
  ADMIN_PORT: Number(process.env.ADMIN_PORT) || 3087,
  API_URL: process.env.API_URL
    ? process.env.API_URL
    : process.env.API_PORT
    ? `http://localhost:${process.env.API_PORT}`
    : "http://localhost:3088",
}

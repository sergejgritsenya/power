type TAdminEnv = {
  WDS_PORT: number | undefined
}
export const adminEnv: TAdminEnv = {
  WDS_PORT: process.env.WDS_PORT ? Number(process.env.WDS_PORT) : undefined,
}

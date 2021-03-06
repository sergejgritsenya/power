import { Chyk, useChyk } from "chyk"
import { TChykDeps } from ".."

export const useAdminChyk = (): Chyk<TChykDeps> => useChyk<TChykDeps>()

export const useAxios = () => useAdminChyk().deps.axios
export const useAuth = () => useAdminChyk().deps.auth
export const useSnackService = () => useAdminChyk().deps.snackService

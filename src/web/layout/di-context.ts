import { Chyk, useChyk } from "chyk"
import { TWebChykDeps } from ".."

export const useWebChyk = (): Chyk<TWebChykDeps> => useChyk<TWebChykDeps>()

export const useAxios = () => useWebChyk().deps.axios
export const useSnackService = () => useWebChyk().deps.snackService

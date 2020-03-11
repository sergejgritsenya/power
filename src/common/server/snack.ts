import { WithSnackbarProps } from "notistack"

// NOTE methods here need to be replaced on first useSnackbar usage
export class SnackService {
  snackbar: WithSnackbarProps["enqueueSnackbar"] = () => {
    throw new Error("enqueueSnackbar is not initialized")
  }
  closeSnackbar: WithSnackbarProps["closeSnackbar"] = () => {
    throw new Error("enqueueSnackbar is not initialized")
  }
}

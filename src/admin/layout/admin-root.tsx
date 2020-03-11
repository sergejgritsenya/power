import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { SnackbarProvider } from "notistack"
import React, { FC, useEffect, useRef } from "react"
import { useSnackService } from "./di-context"
import { getTheme } from "./theme"

export const AdminRoot: FC = ({ children }) => {
  const ref = useRef<any>()
  const snackService = useSnackService()
  useEffect(() => {
    snackService.snackbar = ref.current.enqueueSnackbar
    snackService.closeSnackbar = ref.current.closeSnackbar
  }, [])
  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        ref={ref}
      >
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  )
}

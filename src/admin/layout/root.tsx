import { CssBaseline, ThemeProvider } from "@material-ui/core"
import React, { FC } from "react"
import { getTheme } from "./theme"

export const AdminRoot: FC = ({ children }) => {
  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
// const admin_container = new AdminContainer()
// const container = admin_container.init()
// const admin_id = document.getElementById("admin")
// render(
//   <DiContextProvider value={container}>
//     <AdminRoot />
//   </DiContextProvider>,
//   admin_id
// )

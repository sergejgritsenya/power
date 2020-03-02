import { createMuiTheme } from "@material-ui/core/styles"

export const getTheme = () => {
  return createMuiTheme({
    palette: {
      primary: {
        main: "#1c3780",
        // main: "#006A94",
      },
      secondary: {
        main: "#EC0000",
      },
    },
  })
}

import { createMuiTheme, Theme } from "@material-ui/core/styles"

const gold = "#b89960"
const blue = "#1c3780"

export const getTheme = (): Theme =>
  createMuiTheme({
    palette: {
      primary: {
        main: blue,
      },
      common: {
        black: gold,
      },
      secondary: {
        main: "#EC0000",
      },
    },
    overrides: {
      MuiButton: {
        contained: {
          fontWeight: "bold",
        },
        containedPrimary: {
          color: gold,
        },
      },
    },
    props: {
      MuiButton: {
        variant: "contained",
      },
    },
  })

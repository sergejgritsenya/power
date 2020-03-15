import { createMuiTheme, Theme } from "@material-ui/core/styles"

const gold = "#b89960"
const grey = "#f7f7f7"
const blue = "#183883"
// const grey = "#000d6e"
const dark_grey = "#464646"
// const blue = "#1c3780"

export const getTheme = (): Theme =>
  createMuiTheme({
    palette: {
      primary: {
        light: blue,
        main: grey,
        dark: dark_grey,
      },
      common: {
        black: gold,
      },
      secondary: {
        main: gold,
      },
      background: {
        default: grey,
      },
    },
    overrides: {
      MuiButton: {
        contained: {
          fontWeight: "bold",
        },
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      h3: {
        fontSize: "2rem",
        fontWeight: "bold",
      },
    },
    props: {
      MuiButton: {
        variant: "contained",
      },
      MuiCardHeader: {
        titleTypographyProps: {
          variant: "h3",
        },
      },
      MuiInputLabel: { shrink: true },
      MuiFormControl: { margin: "normal", fullWidth: true },
      MuiGrid: { spacing: 2 },
      MuiTextField: {
        variant: "outlined",
        fullWidth: true,
        margin: "dense",
      },
    },
  })

import { Theme } from "@material-ui/core/styles"
import { Container } from "inversify"
import React from "react"
import { symbols } from "../server/symbols"

const DiContext = React.createContext({} as Container)
export const DiContextProvider = DiContext.Provider
const useAdminDi = () => React.useContext(DiContext)
export const useTheme = (): Theme => useAdminDi().get(symbols.theme)

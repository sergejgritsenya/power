import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { WebHeader } from "./header/header"
import { WebFooter } from "./web-footer"
import { WebMain } from "./web-main"

type TWebAppProps = TRouteComponentProps<{}>
export const WebApp: FC<TWebAppProps> = ({ route }) => {
  return (
    <>
      <WebHeader />
      <WebMain route={route} />
      <WebFooter />
    </>
  )
}

import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { WebFooter } from "./web-footer"
import { WebHeader } from "./web-header"
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

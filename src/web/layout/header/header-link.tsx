import { Link as MuiLink } from "@material-ui/core"
import { LinkProps as MuiLinkProps } from "@material-ui/core/Link"
import React from "react"
import { Link as RouterDomLink, LinkProps as RouterLinkProps } from "react-router-dom"

export type THeaderLinkProps = MuiLinkProps & RouterLinkProps
export const HeaderLink: React.SFC<THeaderLinkProps> = props => (
  <MuiLink component={RouterDomLink as any} {...props} />
)

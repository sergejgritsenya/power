import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SvgIconProps,
} from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"
import React, { ComponentType, FC } from "react"
import { NavLink, NavLinkProps } from "react-router-dom"

const useStyles = makeStyles(
  {
    root: { color: "#fafafa" },
    itemIcon: {
      color: "inherit",
    },
    text: {
      paddingLeft: 0,
    },
    active: {
      color: "#b89960",
    },
  },
  { name: "NavItem" }
)
export const NavBar: FC = () => (
  <List component="nav">
    <NavItemLink exact to={"/admin/"} Icon={AccountCircle} text={"My account"} />
    <NavItemLink to={"/admin/admins"} Icon={AccountCircle} text={"Admins"} />
    <NavItemLink to={"/admin/tournaments"} Icon={AccountCircle} text={"Tournaments"} />
  </List>
)

type TNavItemCommonProps = {
  Icon: ComponentType<SvgIconProps>
  text: string
}
type TNavItemProps = TNavItemCommonProps
const NavItem: FC<TNavItemProps> = props => {
  const { Icon, text, ...rest } = props
  const classes = useStyles()
  return (
    <ListItem button classes={{ root: classes.root }} {...rest}>
      <ListItemIcon classes={{ root: classes.itemIcon }}>
        <Icon color="inherit" />
      </ListItemIcon>
      <ListItemText primary={text} classes={{ root: classes.text }} />
    </ListItem>
  )
}

type TNavItemLinkProps = TNavItemCommonProps & NavLinkProps
const NavItemLink: FC<TNavItemLinkProps> = props => {
  const classes = useStyles()
  return <NavItem component={NavLink} activeClassName={classes.active} {...props} />
}

// const useStylesLink = makeStyles(
//   theme => ({
//     active: {
//       color: theme.palette.secondary.main,
//     },
//   }),
//   { name: "NavItemLink" }
// )

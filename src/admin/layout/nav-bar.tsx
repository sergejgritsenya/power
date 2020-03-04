import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SvgIconProps,
  Theme,
} from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"
import EmojiEvents from "@material-ui/icons/EmojiEvents"
import HowToReg from "@material-ui/icons/HowToReg"
import React, { ComponentType, FC } from "react"
import { NavLink, NavLinkProps } from "react-router-dom"

export const AdminNavBar: FC = () => {
  const classes = useStyles()
  return (
    <List component="nav" className={classes.root}>
      <NavItem exact to={"/"} Icon={AccountCircle} text={"My account"} />
      <NavItem to={"/admins"} Icon={HowToReg} text={"Admins"} />
      <NavItem to={"/tournaments"} Icon={EmojiEvents} text={"Tournaments"} />
    </List>
  )
}

type TNavItemProps = NavLinkProps & {
  Icon: ComponentType<SvgIconProps>
  text: string
}
const NavItem: FC<TNavItemProps> = props => {
  const { Icon, text, ...rest } = props
  const classes = useStyles()
  return (
    <ListItem
      button
      className={classes.item}
      component={NavLink}
      activeClassName={classes.active}
      {...rest}
    >
      <ListItemIcon className={classes.item_icon}>
        <Icon color="inherit" />
      </ListItemIcon>
      <ListItemText primary={text} className={classes.item_text} />
    </ListItem>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
    width: "245px",
  },
  item: { color: "#fafafa" },
  item_icon: {
    color: "inherit",
  },
  item_text: {
    paddingLeft: 0,
  },
  active: {
    color: theme.palette.common.black,
  },
}))

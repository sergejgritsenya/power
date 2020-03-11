import { Container, ContainerProps, makeStyles } from "@material-ui/core"
import React, { FC } from "react"

export const PageInner: FC<ContainerProps> = ({ children, ...props }) => {
  const classes = useStyles()
  return (
    <Container maxWidth="lg" className={classes.container} {...props}>
      {children}
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "auto",
    background: "#fafafa",
    maxWidth: "1280px",
    width: "100%",
    margin: "0 auto",
    padding: "24px 24px",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

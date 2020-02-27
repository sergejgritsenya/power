import React, { FC } from "react"
import { render } from "react-dom"

const AdminRoot: FC = () => {
  return (
    <>
      <h1>Hello POWER</h1>
    </>
  )
}
const admin_id = document.getElementById("admin")
render(<AdminRoot />, admin_id)

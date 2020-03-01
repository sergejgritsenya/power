import React, { FC } from "react"
import { render } from "react-dom"
import { AdminLayot } from "./layout"

const AdminRoot: FC = () => {
  return (
    <>
      <AdminLayot />
    </>
  )
}
const admin_id = document.getElementById("admin")
render(<AdminRoot />, admin_id)

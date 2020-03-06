import React, { FC } from "react"
import { render } from "react-dom"

const WebRoot: FC = () => {
  return (
    <>
      <h1>Hello POWER</h1>
    </>
  )
}
const web_id = document.getElementById("app")
render(<WebRoot />, web_id)

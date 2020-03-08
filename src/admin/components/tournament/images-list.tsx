import { Card, CardContent, CardHeader } from "@material-ui/core"
import React, { FC } from "react"
import { NoElements } from "../common/no-elements"

export const ImagesList: FC = () => {
  return (
    <Card>
      <CardHeader title="Image list"></CardHeader>
      <CardContent>
        <NoElements />
      </CardContent>
    </Card>
  )
}

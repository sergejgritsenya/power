import React, { FC } from "react"
import { RouteComponentProps } from "react-router-dom"

type TTournamentProps = {} & RouteComponentProps<{
  tournament_id: string
}>
export const Tournament: FC<TTournamentProps> = props => {
  const { tournament_id } = props.match.params
  return <h1>{tournament_id}</h1>
}

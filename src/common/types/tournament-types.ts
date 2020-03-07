export type TTournamentList = {
  id: string
  name: string
  logo: string | null
}
export type TTournament = {
  id: string
  name: string
  logo: string | null
  description: string
}
export type TTournamentUpdateProps = {
  name: string
  description: string
}

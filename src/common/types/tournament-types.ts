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
  videos: TTournamentVideo[]
  images: TTournamentImages[]
}
export type TTournamentUpdateProps = {
  name: string
  description: string
}
export type TTournamentVideo = {
  id: string
  url: string
}
export type TTournamentVideoCreateProps = {
  url: string
}
export type TTournamentImages = {
  id: string
  url: string
}

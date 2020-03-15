export type TNewsList = {
  id: string
  title: string
  publish: boolean
  logo: string | null
}
export type TWebNewsList = {
  id: string
  title: string
  publish: boolean
  logo: string | null
  text: string
}
export type TNews = {
  id: string
  title: string
  logo: string | null
  publish: boolean
  text: string
}
export type TNewsUpdateProps = {
  title: string
  publish: boolean
  text: string
}

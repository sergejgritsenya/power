const web_routes = {
  tournaments: "/tournaments",
  news: "/news",
}

export const web_tournament_root_routes = {
  list: `${web_routes.tournaments}/list`,
  root: `${web_routes.tournaments}/:tournament_id`,
}
export const web_tournament_routes = {
  get: `${web_tournament_root_routes.root}/get`,
  video: `${web_tournament_root_routes.root}/video`,
  image: `${web_tournament_root_routes.root}/image`,
}
export const web_news_root_routes = {
  list: `${web_routes.news}/list`,
  root: `${web_routes.news}/:news_id`,
}
export const web_news_routes = {
  get: `${web_news_root_routes.root}/get`,
}

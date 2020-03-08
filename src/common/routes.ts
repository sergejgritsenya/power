export const app_routes = {
  control: "/control",
  web: "/",
}
export const control_routes = {
  admin: `${app_routes.control}/admin`,
  tournament: `${app_routes.control}/tournament`,
  news: `${app_routes.control}/news`,
}
export const admin_root_routes = {
  list: `${control_routes.admin}/list`,
  create: `${control_routes.admin}/create`,
  delete: `${control_routes.admin}/delete`,
  root: `${control_routes.admin}/:admin_id`,
}
export const admin_routes = {
  get: `${admin_root_routes.root}/get`,
}
export const tournament_root_routes = {
  list: `${control_routes.tournament}/list`,
  create: `${control_routes.tournament}/create`,
  delete: `${control_routes.tournament}/delete`,
  root: `${control_routes.tournament}/:tournament_id`,
}
export const tournament_routes = {
  get: `${tournament_root_routes.root}/get`,
  update: `${tournament_root_routes.root}/update`,
  video: `${tournament_root_routes.root}/video`,
}
export const tournament_video_routes = {
  create: `${tournament_routes.video}/create`,
  delete: `${tournament_routes.video}/delete`,
}
export const news_root_routes = {
  list: `${control_routes.news}/list`,
  create: `${control_routes.news}/create`,
  delete: `${control_routes.news}/delete`,
  root: `${control_routes.news}/:news_id`,
}
export const news_routes = {
  get: `${news_root_routes.root}/get`,
  update: `${news_root_routes.root}/update`,
}

export const frontRoute = (route: string, args: Record<string, any>): string => {
  const arr = route.split("/")
  const res_arr = arr.map(chunk => {
    if (chunk.startsWith(":")) {
      return args[chunk.slice(1)]
    }
    return chunk
  })
  return res_arr.join("/")
}

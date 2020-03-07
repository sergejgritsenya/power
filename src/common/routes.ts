export const app_routes = {
  control: "/control",
  web: "/",
}
export const control_routes = {
  admin: `${app_routes.control}/admin`,
}
export const admin_root_routes = {
  list: `${control_routes.admin}/list`,
  create: `${control_routes.admin}/create`,
  delete: `${control_routes.admin}/delete`,
  root: `${control_routes.admin}/:admin_id`,
}
export const admin_routes = {
  get: `${admin_root_routes.root}/get`,
  update: `${admin_root_routes.root}/update`,
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

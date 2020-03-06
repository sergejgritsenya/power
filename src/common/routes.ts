export const app_routes = {
  control: "/control",
  web: "/",
}
export const control_routes = {
  admin: `${app_routes.control}/admin`,
}
export const admin_root_routes = {
  list: `${control_routes.admin}/list`,
  root: `${control_routes.admin}/:admin_id`,
}
export const admin_routes = {
  get: `${admin_root_routes.root}/get`,
  update: `${admin_root_routes.root}/update`,
  delete: `${admin_root_routes.root}/delete`,
}

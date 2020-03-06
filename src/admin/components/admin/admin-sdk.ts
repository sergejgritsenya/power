import { AxiosInstance } from "axios"
import { inject, injectable } from "inversify"
import { admin_root_routes, admin_routes, frontRoute } from "../../../common/routes"
import {
  TAdmin,
  TAdminCreateProps,
  TAdminList,
  TAdminUpdateProps,
} from "../../../common/types/admin-types"
import { AxiosService } from "../../server/axios-service"

@injectable()
export class AdminSdk {
  private axios: AxiosInstance
  constructor(@inject(AxiosService) axiosService: AxiosService) {
    this.axios = axiosService.axios
  }
  adminList = async (): Promise<TAdminList[]> => {
    const r = await this.axios.post(admin_root_routes.list)
    return r.data
  }
  adminGet = async (admin_id: string): Promise<TAdmin> => {
    const r = await this.axios.post(frontRoute(admin_routes.get, { admin_id }))
    return r.data
  }
  adminCreate = async (data: TAdminCreateProps): Promise<TAdmin> => {
    const r = await this.axios.post(admin_root_routes.create, data)
    return r.data
  }
  adminUpdate = async (admin_id: string, data: TAdminUpdateProps): Promise<TAdmin> => {
    const r = await this.axios.post(frontRoute(admin_routes.update, { admin_id }), data)
    return r.data
  }
}

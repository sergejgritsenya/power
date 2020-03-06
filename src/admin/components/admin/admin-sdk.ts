import { AxiosInstance } from "axios"
import { inject, injectable } from "inversify"
import { admin_root_routes } from "../../../common/routes"
import { TAdminList } from "../../../common/types/admin-types"
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
}

import { AxiosInstance } from "axios"

// @injectable()
export class AdminSdk {
  private axios: AxiosInstance
  constructor(axios: AxiosInstance) {
    this.axios = axios
  }
  // constructor(@inject(AxiosService) axiosService: AxiosService) {
  //   this.axios = axiosService.axios
  // }
  adminList = async () => {
    const r = await this.axios.post("http://localhost:3088/admin/list")
    return r.data
  }
}

import Axios, { AxiosInstance, AxiosResponse } from "axios"
import { TAxiosSendProps } from "../../common/types/common-types"
import { webEnv } from "./web-env"

export class AxiosService {
  private axios: AxiosInstance
  private api_url = webEnv.API_URL
  constructor() {
    this.axios = Axios.create({ baseURL: this.api_url })
  }
  sendPost = async <T>(props: TAxiosSendProps): Promise<AxiosResponse<T>> => {
    return await this.axios.post<T>(props.route, props.data)
  }
}

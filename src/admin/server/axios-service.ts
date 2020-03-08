import Axios, { AxiosInstance, AxiosResponse } from "axios"
import { TAxiosSendProps } from "../../common/types/common-types"
import { adminEnv } from "./env"

export class AxiosService {
  axios: AxiosInstance
  api_url = adminEnv.API_URL
  constructor() {
    this.axios = Axios.create({ baseURL: this.api_url })
  }
  sendPost = async <T>(props: TAxiosSendProps): Promise<AxiosResponse<T>> => {
    return await this.axios.post<T>(props.route, props.data)
  }
}

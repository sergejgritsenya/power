import Axios, { AxiosInstance, AxiosResponse } from "axios"
import { EAuthKey } from "../../common/types/auth-types"
import { TAxiosSendProps } from "../../common/types/common-types"
import { adminEnv } from "./env"

export class AxiosService {
  axios: AxiosInstance
  api_url = adminEnv.API_URL
  auth_header = EAuthKey.admin
  constructor(value?: string) {
    const headers = value ? { post: { [this.auth_header]: value } } : undefined
    this.axios = Axios.create({ baseURL: this.api_url, headers })
  }
  sendPost = async <T>(props: TAxiosSendProps): Promise<AxiosResponse<T>> => {
    return await this.axios.post<T>(props.route, props.data)
  }
}

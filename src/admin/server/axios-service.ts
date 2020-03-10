import Axios, { AxiosInstance, AxiosResponse } from "axios"
import { EAuthKey } from "../../common/types/auth-types"
import { TAxiosSendProps } from "../../common/types/common-types"
import { adminEnv } from "./env"

export class AxiosService {
  private axios: AxiosInstance
  private api_url = adminEnv.API_URL
  private auth_header: string | undefined
  constructor() {
    this.axios = Axios.create({ baseURL: this.api_url })
  }
  sendPost = async <T>(props: TAxiosSendProps): Promise<AxiosResponse<T>> => {
    const headers = this.auth_header ? { post: { [EAuthKey.admin]: this.auth_header } } : undefined
    return await this.axios.post<T>(props.route, props.data, { headers })
  }
  setAuthHeader = async (auth_header: string | undefined) => {
    this.auth_header = auth_header
  }
}

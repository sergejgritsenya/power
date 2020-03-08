import Axios, { AxiosInstance, AxiosResponse } from "axios"
import { TAxiosSendProps } from "../../common/types/common-types"

const api_url = `http://localhost:3088`
export class AxiosService {
  axios: AxiosInstance
  constructor() {
    this.axios = Axios.create({ baseURL: api_url })
  }
  sendPost = async <T>(props: TAxiosSendProps): Promise<AxiosResponse<T>> => {
    return await this.axios.post<T>(props.route, props.data)
  }
}

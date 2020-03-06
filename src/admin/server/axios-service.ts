import Axios, { AxiosInstance } from "axios"
import { injectable } from "inversify"

const api_url = `http://localhost:3088`
@injectable()
export class AxiosService {
  axios: AxiosInstance
  constructor() {
    this.axios = Axios.create({ baseURL: api_url })
  }
}

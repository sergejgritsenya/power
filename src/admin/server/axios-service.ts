import Axios, { AxiosInstance } from "axios"

const api_url = `http://localhost:3088`
export class AxiosService {
  axios: AxiosInstance
  constructor() {
    this.axios = Axios.create({ baseURL: api_url })
  }
}

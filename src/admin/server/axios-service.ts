import Axios, { AxiosInstance } from "axios"

export class AxiosService {
  axios: AxiosInstance
  constructor() {
    this.axios = Axios.create()
  }
}

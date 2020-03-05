import Axios, { AxiosInstance } from "axios"

const api_port = process.env.API_PORT
const api_url = `http://localhost:${api_port}`
export class AxiosService {
  axios: AxiosInstance
  constructor() {
    this.axios = Axios.create({ baseURL: api_url })
  }
}

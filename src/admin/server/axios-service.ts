import Axios, { AxiosInstance } from "axios"
import { inject, injectable } from "inversify"
import { symbols } from "./symbols"

@injectable()
export class AxiosService {
  axios: AxiosInstance
  constructor(@inject(symbols.api_url) public readonly api_url: string) {
    this.axios = Axios.create({ baseURL: api_url })
  }
}

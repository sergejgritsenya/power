export class AdminSdk {
  // axios: AxiosInstance
  // constructor(axios: AxiosInstance) {
  //   this.axios = axios
  // }
  options?: RequestInit
  constructor() {}
  testGet = async () => {
    const r = await fetch("http://localhost:3088/admin", {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    // const r = await this.axios.get("https://www.youtube.com/")
    // const r = await this.axios.get("http://localhost:3088/admin")
    console.log(r)
  }
  testPost = async () => {
    // const r = await this.axios.post("http://localhost:3088/admin")
    // console.log(r.data)
  }
}

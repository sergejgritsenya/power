import { computed } from "mobx"
import { model, Model, modelAction, prop } from "mobx-keystone"
import { TAuthProps } from "../../../common/types/auth-types"

@model("LoginModel")
export class LoginModel extends Model({
  login: prop<string>(""),
  password: prop<string>(""),
  is_loading: prop<boolean>(false),
}) {
  @computed
  get json(): TAuthProps {
    return { login: this.login.trim(), password: this.password.trim() }
  }
  @modelAction
  setLogin(login: string) {
    this.login = login.trim()
  }
  @modelAction
  setPassword(password: string) {
    this.password = password.trim()
  }
  @modelAction
  setLoading(is_loading: boolean) {
    this.is_loading = is_loading
  }
}

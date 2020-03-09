import { computed } from "mobx"
import { Model, model, modelAction, prop } from "mobx-keystone"
import { TAdminCreateProps } from "../../../common/types/admin-types"

@model("AdminModel")
export class AdminModel extends Model({
  id: prop<string>(),
  login: prop<string>(""),
  email: prop<string>(""),
  is_loading: prop<boolean>(false),
}) {
  @modelAction
  setLogin(login: string) {
    this.login = login.trim()
  }
  @modelAction
  setEmail(email: string) {
    this.email = email.trim()
  }
  @modelAction
  setLoading(is_loading: boolean) {
    this.is_loading = is_loading
  }
}
@model("CreateAdminModel")
export class CreateAdminModel extends Model({
  login: prop<string>(""),
  email: prop<string>(""),
  password: prop<string>(""),
  confirm_password: prop<string>(""),
  is_loading: prop<boolean>(false),
}) {
  @computed
  get json(): TAdminCreateProps {
    return {
      login: this.login.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
      confirm_password: this.confirm_password.trim(),
    }
  }
  @computed
  get validation(): boolean {
    return (
      !!this.login.trim() &&
      !!this.email.trim() &&
      !!this.password.trim() &&
      !!this.confirm_password.trim() &&
      this.password === this.confirm_password
    )
  }
  @modelAction
  setLogin(login: string) {
    this.login = login
  }
  @modelAction
  setEmail(email: string) {
    this.email = email
  }
  @modelAction
  setPassword(password: string) {
    this.password = password
  }
  @modelAction
  setConfirmPassword(confirm_password: string) {
    this.confirm_password = confirm_password
  }
  @modelAction
  setLoading(is_loading: boolean) {
    this.is_loading = is_loading
  }
}

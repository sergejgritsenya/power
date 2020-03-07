import { computed } from "mobx"
import { Model, model, modelAction, prop } from "mobx-keystone"
import { TAdminCreateProps } from "../../../common/types/admin-types"

@model("AdminModel")
export class AdminModel extends Model({
  id: prop<string>(),
  name: prop<string>(""),
  email: prop<string>(""),
}) {
  @modelAction
  setName(name: string) {
    this.name = name.trim()
  }
  @modelAction
  setEmail(email: string) {
    this.email = email.trim()
  }
}
@model("CreateAdminModel")
export class CreateAdminModel extends Model({
  name: prop<string>(""),
  email: prop<string>(""),
  password: prop<string>(""),
  confirm_password: prop<string>(""),
}) {
  @computed
  get json(): TAdminCreateProps {
    return {
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
      confirm_password: this.confirm_password.trim(),
    }
  }
  @computed
  get validation(): boolean {
    return (
      !!this.name.trim() &&
      !!this.email.trim() &&
      !!this.password.trim() &&
      !!this.confirm_password.trim() &&
      this.password === this.confirm_password
    )
  }
  @modelAction
  setName(name: string) {
    this.name = name
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
}

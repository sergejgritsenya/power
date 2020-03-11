import { computed } from "mobx"
import { model, Model, modelAction, prop } from "mobx-keystone"
import { TAdminChangePasswordProps, TAdminUpdateProps } from "../../../common/types/admin-types"

@model("AccountModel")
export class AccountModel extends Model({
  login: prop<string>(),
  email: prop<string>(),
  is_loading: prop<boolean>(false),
}) {
  @computed
  get json(): TAdminUpdateProps {
    return {
      login: this.login.trim(),
      email: this.email.trim(),
    }
  }
  @computed
  get validation(): boolean {
    return !!this.login.trim() && !!this.email.trim()
  }
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

@model("ChangePasswordModel")
export class ChangePasswordModel extends Model({
  old_password: prop<string>(""),
  new_password: prop<string>(""),
  confirm_password: prop<string>(""),
  open: prop<boolean>(false),
  is_loading: prop<boolean>(false),
}) {
  get json(): TAdminChangePasswordProps {
    return {
      old_password: this.old_password.trim(),
      new_password: this.new_password.trim(),
      confirm_password: this.confirm_password.trim(),
    }
  }
  @computed
  get validation(): boolean {
    return (
      !!this.old_password.trim() &&
      !!this.new_password.trim() &&
      !!this.confirm_password.trim() &&
      this.new_password === this.confirm_password
    )
  }
  @modelAction
  setOldPassword(old_password: string) {
    this.old_password = old_password.trim()
  }
  @modelAction
  setNewPassword(new_password: string) {
    this.new_password = new_password.trim()
  }
  @modelAction
  setConfirmPassword(confirm_password: string) {
    this.confirm_password = confirm_password.trim()
  }
  @modelAction
  setOpen(open: boolean) {
    this.open = open
  }
  @modelAction
  setLoading(is_loading: boolean) {
    this.is_loading = is_loading
  }
  @modelAction
  clean() {
    this.old_password = ""
    this.new_password = ""
    this.confirm_password = ""
    this.open = false
  }
}

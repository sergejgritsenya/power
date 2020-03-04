import { Model, model, modelAction, prop } from "mobx-keystone"

@model("AdminModel")
export class AdminModel extends Model({
  id: prop<string>(),
  name: prop<string>(""),
  email: prop<string>(""),
}) {
  @modelAction
  setName(name: string) {
    this.name = name
  }
  @modelAction
  setEmail(email: string) {
    this.email = email
  }
}

import { model, Model, modelAction, prop } from "mobx-keystone"

@model("ShopImageModel")
export class ShopImageModel extends Model({
  id: prop<string>(),
  url: prop<string>(""),
}) {
  @modelAction
  setUrl(url: string) {
    this.url = url
  }
}

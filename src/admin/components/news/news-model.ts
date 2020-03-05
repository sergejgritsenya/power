import { Model, model, modelAction, prop } from "mobx-keystone"

@model("NewsModel")
export class NewsModel extends Model({
  id: prop<string>(),
  title: prop<string>(""),
  text: prop<string>(""),
}) {
  @modelAction
  setTitle(title: string) {
    this.title = title
  }
  @modelAction
  setText(text: string) {
    this.text = text
  }
}

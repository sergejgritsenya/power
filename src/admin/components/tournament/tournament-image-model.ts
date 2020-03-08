import { model, Model, modelAction, prop } from "mobx-keystone"

@model("TournamentImageModel")
export class TournamentImageModel extends Model({
  id: prop<string>(),
  url: prop<string>(""),
}) {
  @modelAction
  setUrl(url: string) {
    this.url = url
  }
}

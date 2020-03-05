import { Model, model, modelAction, prop } from "mobx-keystone"

@model("TournamentModel")
export class TournamentModel extends Model({
  id: prop<string>(),
  name: prop<string>(""),
  description: prop<string>(""),
}) {
  @modelAction
  setName(name: string) {
    this.name = name
  }
  @modelAction
  setDescription(description: string) {
    this.description = description
  }
}

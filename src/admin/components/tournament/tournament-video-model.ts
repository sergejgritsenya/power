import { computed } from "mobx"
import { model, Model, modelAction, prop } from "mobx-keystone"
import { TTournamentVideoCreateProps } from "../../../common/types/tournament-types"

@model("TournamentVideoModel")
export class TournamentVideoModel extends Model({
  id: prop<string>(),
  url: prop<string>(""),
}) {
  @computed
  get json(): TTournamentVideoCreateProps {
    return { url: this.url.trim() }
  }
  @modelAction
  setUrl(url: string) {
    this.url = url
  }
}
@model("TournamentVideoCreateModel")
export class TournamentVideoCreateModel extends Model({
  url: prop<string>(""),
}) {
  @computed
  get json() {
    return { url: this.url.trim() }
  }
  @modelAction
  setUrl(url: string) {
    this.url = url
  }
}

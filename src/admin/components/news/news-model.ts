import { computed, observable } from "mobx"
import { Model, model, modelAction, prop } from "mobx-keystone"
import { TNewsAdmin, TNewsTournaments, TNewsUpdateProps } from "../../../common/types/news-types"

@model("NewsModel")
export class NewsModel extends Model({
  id: prop<string>(),
  title: prop<string>(""),
  publish: prop<boolean>(false),
  logo: prop<string | null>(null),
  text: prop<string>(""),
  tournament_id: prop<string>(""),
  is_loading: prop<boolean>(false),
}) {
  tournaments = observable.array<TNewsTournaments>([])
  get json(): TNewsUpdateProps {
    return {
      title: this.title.trim(),
      publish: this.publish,
      text: this.text.trim(),
      tournament_id: this.tournament_id ? this.tournament_id : "",
    }
  }
  @computed
  get validation(): boolean {
    return !!this.title.trim() && !!this.text.trim()
  }
  @modelAction
  setTitle(title: string) {
    this.title = title
  }
  @modelAction
  setPublish(publish: boolean) {
    this.publish = publish
  }
  @modelAction
  setLogo(logo: string | null) {
    this.logo = logo
  }
  @modelAction
  setText(text: string) {
    this.text = text
  }
  @modelAction
  setTournament(tournament_id: string | null) {
    this.tournament_id = tournament_id ? tournament_id : ""
  }
  setTournaments(tournaments: TNewsTournaments[]) {
    this.tournaments.replace(tournaments)
  }
  @modelAction
  setLoading(is_loading: boolean) {
    this.is_loading = is_loading
  }
  @modelAction
  updateAll(data: TNewsAdmin) {
    this.setTitle(data.news.title)
    this.setText(data.news.text)
    this.setTournaments(data.tournaments)
  }
}
@model("CreateNewsModel")
export class CreateNewsModel extends Model({
  title: prop<string>(""),
  publish: prop<boolean>(false),
  text: prop<string>(""),
  tournament_id: prop<string | null>(null),
  is_loading: prop<boolean>(false),
}) {
  @computed
  get json(): TNewsUpdateProps {
    return {
      title: this.title.trim(),
      publish: this.publish,
      text: this.text.trim(),
      tournament_id: this.tournament_id ? this.tournament_id : "",
    }
  }
  @computed
  get validation(): boolean {
    return !!this.title.trim() && !!this.text.trim()
  }
  @modelAction
  setTitle(title: string) {
    this.title = title
  }
  @modelAction
  setText(text: string) {
    this.text = text
  }
  @modelAction
  setLoading(is_loading: boolean) {
    this.is_loading = is_loading
  }
}

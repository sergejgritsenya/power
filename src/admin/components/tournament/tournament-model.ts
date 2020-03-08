import { computed, observable } from "mobx"
import { Model, model, modelAction, prop } from "mobx-keystone"
import {
  TTournament,
  TTournamentImages,
  TTournamentUpdateProps,
  TTournamentVideo,
} from "../../../common/types/tournament-types"
import { TournamentVideoModel } from "./tournament-video-model"

@model("TournamentModel")
export class TournamentModel extends Model({
  id: prop<string>(),
  name: prop<string>(""),
  logo: prop<string | null>(null),
  description: prop<string>(""),
  is_loading: prop<boolean>(false),
}) {
  images = observable.array<TTournamentImages>([])
  videos = observable.array<TournamentVideoModel>([])
  @computed
  get json(): TTournamentUpdateProps {
    return { name: this.name.trim(), description: this.description.trim() }
  }
  @computed
  get validation(): boolean {
    return !!this.name.trim() && !!this.description.trim()
  }
  @modelAction
  setName(name: string) {
    this.name = name
  }
  @modelAction
  setLogo(logo: string | null) {
    this.logo = logo
  }
  @modelAction
  setDescription(description: string) {
    this.description = description
  }
  @modelAction
  updateAll(data: TTournament) {
    this.setName(data.name)
    this.setLogo(data.logo)
    this.setDescription(data.description)
  }
  @modelAction
  setLoading(is_loading: boolean) {
    this.is_loading = is_loading
  }
  setImages(images: TTournamentImages[]) {
    this.images.replace(images)
  }
  setVideos(videos: TTournamentVideo[]) {
    const video_models = videos.map(video => new TournamentVideoModel(video))
    this.videos.replace(video_models)
  }
}
@model("CreateTournamentModel")
export class CreateTournamentModel extends Model({
  name: prop<string>(""),
  description: prop<string>(""),
  is_loading: prop<boolean>(false),
}) {
  @computed
  get json(): TTournamentUpdateProps {
    return { name: this.name.trim(), description: this.description.trim() }
  }
  @computed
  get validation(): boolean {
    return !!this.name.trim() && !!this.description.trim()
  }
  @modelAction
  setName(name: string) {
    this.name = name
  }
  @modelAction
  setDescription(description: string) {
    this.description = description
  }
  @modelAction
  setLoading(is_loading: boolean) {
    this.is_loading = is_loading
  }
}

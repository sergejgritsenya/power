import { computed } from "mobx"
import { Model, model, modelAction, prop } from "mobx-keystone"
import { TNews, TNewsUpdateProps } from "../../../common/types/news-types"

@model("NewsModel")
export class NewsModel extends Model({
  id: prop<string>(),
  title: prop<string>(""),
  publish: prop<boolean>(false),
  logo: prop<string | null>(null),
  text: prop<string>(""),
  is_loading: prop<boolean>(false),
}) {
  get json(): TNewsUpdateProps {
    return { title: this.title.trim(), publish: this.publish, text: this.text.trim() }
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
  setLoading(is_loading: boolean) {
    this.is_loading = is_loading
  }
  @modelAction
  updateAll(data: TNews) {
    this.setTitle(data.title)
    this.setText(data.text)
  }
}
@model("CreateNewsModel")
export class CreateNewsModel extends Model({
  title: prop<string>(""),
  publish: prop<boolean>(false),
  text: prop<string>(""),
  is_loading: prop<boolean>(false),
}) {
  @computed
  get json(): TNewsUpdateProps {
    return { title: this.title.trim(), publish: this.publish, text: this.text.trim() }
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

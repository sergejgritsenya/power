import { observable } from "mobx"
import { Model, model, modelAction, prop } from "mobx-keystone"

@model("ListModel")
export class ListModel<T> extends Model({
  is_loading: prop<boolean>(false),
}) {
  list = observable.array<T>([], { deep: false })
  setList(list: T[]) {
    this.list.replace(list)
  }
  @modelAction
  setLoading(is_loading: boolean) {
    this.is_loading = is_loading
  }
}

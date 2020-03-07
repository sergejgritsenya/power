import { observable } from "mobx"

export class ListModel<T> {
  list = observable.array<T>([], { deep: false })
  setList(list: T[]) {
    this.list.replace(list)
  }
}

export class ContextManager<T extends {}> {
  map: T = {} as T
  set = (name: string, value: any) => {
    Object.defineProperty(this.map, name, {
      value: value,
      writable: false,
    })
  }
}

import { computed, observable } from "mobx"
import { model, Model, modelAction, prop } from "mobx-keystone"
import { TShop, TShopImage, TShopUpdateProps } from "../../../common/types/shop-types"
import { ShopImageModel } from "./shop-image-model"

@model("ShopModel")
export class ShopModel extends Model({
  id: prop<string>(),
  name: prop<string>(""),
  price: prop<string>(""),
  logo: prop<string | null>(null),
  description: prop<string>(""),
  is_loading: prop<boolean>(false),
}) {
  images = observable.array<ShopImageModel>([])
  @computed
  get json(): TShopUpdateProps {
    return {
      name: this.name.trim(),
      price: this.price.trim(),
      description: this.description.trim(),
    }
  }
  @computed
  get validation(): boolean {
    return !!this.name.trim() && !!this.price.trim() && !!this.description.trim()
  }
  @modelAction
  setName(name: string) {
    this.name = name
  }
  @modelAction
  setPrice(price: string) {
    this.price = price
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
  updateAll(data: TShop) {
    this.setName(data.name)
    this.setPrice(data.price)
    this.setLogo(data.logo)
    this.setDescription(data.description)
  }
  @modelAction
  setLoading(is_loading: boolean) {
    this.is_loading = is_loading
  }
  setImages(images: TShopImage[]) {
    const image_models = images.map(image => new ShopImageModel(image))
    this.images.replace(image_models)
  }
}

@model("CreateShopModel")
export class CreateShopModel extends Model({
  name: prop<string>(""),
  price: prop<string>(""),
  description: prop<string>(""),
  is_loading: prop<boolean>(false),
}) {
  @computed
  get json(): TShopUpdateProps {
    return {
      name: this.name.trim(),
      price: this.price.trim(),
      description: this.description.trim(),
    }
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
  setPrice(price: string) {
    this.price = price
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

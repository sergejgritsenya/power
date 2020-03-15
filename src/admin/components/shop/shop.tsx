import { Tab, Tabs } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import React, { createContext, FC, useContext, useMemo, useState } from "react"
import { TChykLoadData } from "../.."
import { TShop } from "../../../common/types/shop-types"
import { ShopImagesList } from "./shop-image-list"
import { ShopMain } from "./shop-main"
import { ShopModel } from "./shop-model"
import { shopGet } from "./shop-sdk"

type TShopData = AxiosResponse<TShop>
export const shopLoader: TChykLoadData<TShopData, { id: string }> = async ({ match }, { axios }) =>
  axios.sendPost<TShop>(shopGet(match.params.id))

const ShopContext = createContext<ShopModel>(null as any)
export const useShopContext = () => useContext(ShopContext)

type TShopProps = TRouteComponentProps<TShopData>
export const Shop: FC<TShopProps> = ({ data }) => {
  const [value, setValue] = useState<number>(0)
  const shop = useMemo(() => {
    const model = new ShopModel(data)
    model.setImages(data.images)
    return model
  }, [])
  return (
    <ShopContext.Provider value={shop}>
      <Tabs value={value} onChange={(_, val) => setValue(val)}>
        <Tab value={0} label="Main" />
        <Tab value={1} label="Images" />
      </Tabs>
      {value === 0 && <ShopMain />}
      {value === 1 && <ShopImagesList />}
    </ShopContext.Provider>
  )
}

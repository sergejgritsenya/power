import { TRouteConfig } from "chyk"
import { FC } from "react"
import { NotFound } from "./not-found"
import { WebApp } from "./web-app"

export const routes: TRouteConfig[] = [
  {
    component: WebApp as FC,
    dataKey: "layout",
    routes: [
      {
        component: NotFound as FC,
        loadData: async ({ chyk }) => chyk.set404(),
      },
    ],
  },
]

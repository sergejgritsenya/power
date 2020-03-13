import { TRouteConfig } from "chyk"
import { FC } from "react"
import { WebMainPage } from "../components/main/main-page"
import { WebNewsList, webNewsLoader } from "../components/news/news-list"
import { Shop } from "../components/shop/shop"
import { WebTournament, webTournamentLoader } from "../components/tournament/tournament"
import {
  WebTournamentList,
  webTournamentListLoader,
} from "../components/tournament/tournament-list"
import { NotFound } from "./not-found"
import { WebApp } from "./web-app"

export const routes: TRouteConfig[] = [
  {
    path: "/",
    exact: true,
    component: WebMainPage as FC,
    dataKey: "main",
  },
  {
    component: WebApp as FC,
    dataKey: "layout",
    routes: [
      {
        path: "/news",
        exact: true,
        component: WebNewsList as FC,
        loadData: webNewsLoader,
        dataKey: "news",
      },
      {
        path: "/tournaments",
        exact: true,
        component: WebTournamentList as FC,
        loadData: webTournamentListLoader,
        dataKey: "tournaments",
      },
      {
        path: "/tournaments/:tournament_id",
        component: WebTournament as FC,
        loadData: webTournamentLoader,
        dataKey: "tournaments",
      },
      {
        path: "/shop",
        exact: true,
        component: Shop as FC,
        dataKey: "shop",
      },
      {
        component: NotFound as FC,
        loadData: async ({ chyk }) => chyk.set404(),
      },
    ],
  },
]

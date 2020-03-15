import { TRouteConfig } from "chyk"
import { FC } from "react"
import { WebMainPage } from "../components/main/main-page"
import { WebNews, webNewsLoader } from "../components/news/news"
import { WebNewsList, webNewsListLoader } from "../components/news/news-list"
import { WebShop, webShopLoader } from "../components/shop/shop"
import { WebShopList, webShopListLoader } from "../components/shop/shop-list"
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
        loadData: webNewsListLoader,
        dataKey: "news_list",
      },
      {
        path: "/news/:news_id",
        exact: true,
        component: WebNews as FC,
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
        component: WebShopList as FC,
        exact: true,
        loadData: webShopListLoader,
        dataKey: "shop",
      },
      {
        path: "/shop/:shop_id",
        component: WebShop as FC,
        loadData: webShopLoader,
        dataKey: "shop",
      },
      {
        component: NotFound as FC,
        loadData: async ({ chyk }) => chyk.set404(),
      },
    ],
  },
]

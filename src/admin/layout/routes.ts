import { TRouteConfig } from "chyk"
import { FC } from "react"
import { AdminAccount } from "../components/account/account"
import { Admin, adminLoader } from "../components/admin/admin"
import { AdminList, adminListLoader } from "../components/admin/admin-list"
import { News, newsLoader } from "../components/news/news"
import { NewsList, newsListLoader } from "../components/news/news-list"
import { ShopList, shopListLoader } from "../components/shop/shop-list"
import { Tournament, tournamentLoader } from "../components/tournament/tournament"
import { TournamentList, tournamentListLoader } from "../components/tournament/tournament-list"
import { AdminApp, adminAppLoader } from "./admin-app"
import { NotFound } from "./not-found"

export const routes: TRouteConfig[] = [
  {
    component: AdminApp as FC,
    loadData: adminAppLoader,
    dataKey: "main",
    routes: [
      {
        path: "/",
        exact: true,
        component: AdminAccount as FC,
        dataKey: "account",
      },
      {
        path: "/admins",
        exact: true,
        loadData: adminListLoader,
        component: AdminList as FC,
        dataKey: "admins",
      },
      {
        path: "/admins/:id",
        loadData: adminLoader,
        component: Admin as FC,
        dataKey: "admin",
      },
      {
        path: "/tournaments",
        exact: true,
        loadData: tournamentListLoader,
        component: TournamentList as FC,
        dataKey: "tournaments",
      },
      {
        path: "/tournaments/:id",
        loadData: tournamentLoader,
        component: Tournament as FC,
        dataKey: "tournament",
      },
      {
        path: "/news",
        exact: true,
        loadData: newsListLoader,
        component: NewsList as FC,
        dataKey: "news_list",
      },
      {
        path: "/news/:id",
        loadData: newsLoader,
        component: News as FC,
        dataKey: "news",
      },
      {
        path: "/shop",
        exact: true,
        loadData: shopListLoader,
        component: ShopList as FC,
        dataKey: "shop_list",
      },
      {
        component: NotFound as FC,
        loadData: async ({ chyk }) => chyk.set404(),
      },
    ],
  },
]

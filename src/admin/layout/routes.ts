import { TRouteConfig } from "chyk"
import { FC } from "react"
import { AdminAccount } from "../components/account/account"
import { Login } from "../components/account/login"
import { Admin, adminLoader } from "../components/admin/admin"
import { AdminCreate } from "../components/admin/admin-create"
import { AdminList, adminListLoader } from "../components/admin/admin-list"
import { News, newsLoader } from "../components/news/news"
import { NewsCreate } from "../components/news/news-create"
import { NewsList, newsListLoader } from "../components/news/news-list"
import { ShopList, shopListLoader } from "../components/shop/shop-list"
import { Tournament, tournamentLoader } from "../components/tournament/tournament"
import { TournamentCreate } from "../components/tournament/tournament-create"
import { TournamentList, tournamentListLoader } from "../components/tournament/tournament-list"
import { AdminApp, adminAppLoader } from "./admin-app"
import { NotFound } from "./not-found"

export const routes: TRouteConfig[] = [
  {
    path: "/login",
    component: Login as FC,
  },
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
        path: "/admins/create",
        exact: true,
        component: AdminCreate as FC,
        dataKey: "admin_create",
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
        path: "/tournaments/create",
        exact: true,
        component: TournamentCreate as FC,
        dataKey: "tournaments_create",
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
        path: "/news/create",
        exact: true,
        component: NewsCreate as FC,
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

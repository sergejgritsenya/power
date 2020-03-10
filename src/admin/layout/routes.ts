import { TRouteConfig } from "chyk"
import { FC } from "react"
import { AdminAccount, adminAccountLoader } from "../components/account/account"
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
    dataKey: "layout",
    loadData: adminAppLoader,
    routes: [
      {
        path: "/",
        component: AdminAccount as FC,
        exact: true,
        loadData: adminAccountLoader,
        dataKey: "account",
      },
      {
        path: "/admins",
        component: AdminList as FC,
        exact: true,
        loadData: adminListLoader,
        dataKey: "admins",
      },
      {
        path: "/admins/create",
        component: AdminCreate as FC,
        exact: true,
        dataKey: "admin_create",
      },
      {
        path: "/admins/:id",
        component: Admin as FC,
        loadData: adminLoader,
        dataKey: "admin",
      },
      {
        path: "/tournaments",
        exact: true,
        component: TournamentList as FC,
        loadData: tournamentListLoader,
        dataKey: "tournaments",
      },
      {
        path: "/tournaments/create",
        component: TournamentCreate as FC,
        exact: true,
        dataKey: "tournaments_create",
      },
      {
        path: "/tournaments/:id",
        component: Tournament as FC,
        loadData: tournamentLoader,
        dataKey: "tournament",
      },
      {
        path: "/news",
        component: NewsList as FC,
        exact: true,
        loadData: newsListLoader,
        dataKey: "news_list",
      },
      {
        path: "/news/create",
        component: NewsCreate as FC,
        exact: true,
        dataKey: "news_list",
      },
      {
        path: "/news/:id",
        component: News as FC,
        loadData: newsLoader,
        dataKey: "news",
      },
      {
        path: "/shop",
        component: ShopList as FC,
        exact: true,
        loadData: shopListLoader,
        dataKey: "shop_list",
      },
      {
        component: NotFound as FC,
        loadData: async ({ chyk }) => chyk.set404(),
      },
    ],
  },
]

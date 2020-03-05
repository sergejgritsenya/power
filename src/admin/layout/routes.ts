import { TRouteConfig } from "chyk"
import { FC } from "react"
import { AdminAccount } from "../components/account/account"
import { AdminList, adminListLoader } from "../components/admin/admin-list"
import { TournamentList } from "../components/tournament/tournament-list"
import { AdminApp, adminAppLoader } from "./admin-app"

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
        path: "/tournaments",
        exact: true,
        component: TournamentList as FC,
        dataKey: "tournaments",
      },
    ],
  },
]

import { Grid, makeStyles } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { TTournamentList } from "../../../common/types/tournament-types"
import { WebNoElements } from "../common/no-elements"
import { tournamentList } from "./tournament-sdk"

type TTournamentListData = AxiosResponse<TTournamentList[]>
export const webTournamentListLoader: TChykLoadData<TTournamentListData> = async (_, { axios }) =>
  axios.sendPost(tournamentList())
type TTournamentListProps = TRouteComponentProps<TTournamentListData>

export const WebTournamentList: FC<TTournamentListProps> = ({ data: tournaments }) => {
  const classes = useStyles()
  return (
    <Grid container justify="center" className={classes.superRoot}>
      {tournaments.length ? (
        tournaments.map(item => (
          <Grid
            item
            xs={12}
            md={3}
            key={item.id}
            className={classes.root}
            component="a"
            href={`/tournaments/${item.id}`}
          >
            <img src={item.logo || "/static/default-img.png"} className={classes.image} />
          </Grid>
        ))
      ) : (
        <WebNoElements />
      )}
    </Grid>
  )
}

const useStyles = makeStyles(_theme => ({
  superRoot: {
    minHeight: "calc(100vh - 110px - 100px)",
    paddingTop: "30px",
    marginBottom: "15px",
  },
  root: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px",
  },
  image: {
    width: "290px",
    height: "450px",
  },
}))

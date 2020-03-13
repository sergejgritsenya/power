import { Grid, makeStyles } from "@material-ui/core"
import { AxiosResponse } from "axios"
import { TRouteComponentProps } from "chyk"
import React, { FC } from "react"
import { TChykLoadData } from "../.."
import { TTournament } from "../../../common/types/tournament-types"
import { tournamentGet } from "./tournament-sdk"

type TTournamentData = AxiosResponse<TTournament>
export const webTournamentLoader: TChykLoadData<TTournamentData> = async ({ match }, { axios }) =>
  axios.sendPost(tournamentGet(match.params.tournament_id))
type TTournamentProps = TRouteComponentProps<TTournamentData>

export const WebTournament: FC<TTournamentProps> = ({ data: tournament }) => {
  const classes = useStyles()
  return (
    <>
      <Grid container justify="center" className={classes.superRoot}>
        <Grid item xs={12} md={6} className={classes.root}>
          <img src={tournament.logo || "/static/default-img.png"} className={classes.logo} />
        </Grid>
        <Grid item xs={12} md={6} className={classes.root}>
          <div className={classes.text}>{tournament.description}</div>
        </Grid>
        {tournament.images.length
          ? tournament.images.map(image => (
              <Grid item xs={12} md={6} className={classes.root} key={image.id}>
                <img src={image.url} className={classes.image} />
              </Grid>
            ))
          : null}
        {tournament.videos.length
          ? tournament.videos.map(video => (
              <Grid item xs={12} md={6} className={classes.root} key={video.id}>
                <div className={classes.iframe} dangerouslySetInnerHTML={{ __html: video.url }} />
              </Grid>
            ))
          : null}
      </Grid>
    </>
  )
}

const useStyles = makeStyles(theme => ({
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
  logo: {
    width: "290px",
    height: "450px",
  },
  image: {
    width: "200px",
    height: "200px",
  },
  text: {
    color: theme.palette.primary.light,
  },
  iframe: {
    border: `1px solid ${theme.palette.common}`,
    "& iframe": {
      width: "100%",
      height: "400px",
      marginBottom: "-5px",
    },
  },
}))

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core"
import { useSnackbar } from "notistack"
import React, { FC, useMemo } from "react"
import {
  TTournamentVideo,
  TTournamentVideoCreateProps,
} from "../../../common/types/tournament-types"
import { useAxios } from "../../layout/di-context"
import { ApplyRemoveDialog } from "../common/apply-remove-dialog"
import { NoElements } from "../common/no-elements"
import { useTournamentContext } from "./tournament"
import { TournamentVideoCreateModel, TournamentVideoModel } from "./tournament-video-model"

export const VideosList: FC = () => {
  const tournament = useTournamentContext()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const createVideo = async (data: TTournamentVideoCreateProps) => {
    tournament.setLoading(true)
    try {
      tournament.setLoading(false)
      enqueueSnackbar("Succesfully created", {
        variant: "success",
      })
    } catch (e) {
      tournament.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
    }
  }
  const deleteVideo = async (video_id: string) => {
    tournament.setLoading(true)
    try {
      tournament.setLoading(false)
      enqueueSnackbar("Succesfully deleted", {
        variant: "success",
      })
    } catch (e) {
      tournament.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
    }
  }
  return (
    <Card>
      <CardHeader title="Video list" />
      <CardContent>
        <VideoCreateItem createVideo={createVideo} />
        {tournament.videos.length ? (
          tournament.videos.map(video => <VideoListItem video={video} deleteVideo={deleteVideo} />)
        ) : (
          <NoElements />
        )}
      </CardContent>
    </Card>
  )
}

type TVideoCreateItemProps = {
  createVideo: (data: TTournamentVideoCreateProps) => void
}
const VideoCreateItem: FC<TVideoCreateItemProps> = props => {
  const { createVideo } = props
  const video = useMemo(() => {
    const model = new TournamentVideoCreateModel({})
    return model
  }, [])
  return (
    <div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={12} lg={10}>
          <TextField label="url" />
        </Grid>
        <Grid item xs={12} lg={2}>
          <Button color="primary" onClick={() => createVideo(video.json)}>
            Create
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </div>
  )
}
type TVideoListItemProps = {
  video: TTournamentVideo
  deleteVideo: (id: string) => void
}
const VideoListItem: FC<TVideoListItemProps> = props => {
  const { video, deleteVideo } = props
  const classes = useStyles()
  const video_model = useMemo(() => {
    const model = new TournamentVideoModel(video)
    return model
  }, [])
  return (
    <div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={12} md={6}>
          <div className={classes.iframe} dangerouslySetInnerHTML={{ __html: video_model.url }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ApplyRemoveDialog id={video_model.id} removeEntity={deleteVideo} entity_name="video" />
        </Grid>
      </Grid>
      <Divider />
    </div>
  )
}

const useStyles = makeStyles(
  theme => {
    return {
      iframe: {
        border: `1px solid ${theme.palette.common}`,
        "& iframe": {
          width: "100%",
          height: "220px",
          marginBottom: "-5px",
          [theme.breakpoints.up("sm")]: {
            height: "360px",
          },
          [theme.breakpoints.up("md")]: {
            height: "160px",
          },
        },
      },
    }
  },
  { name: "VideoLisstItem" }
)

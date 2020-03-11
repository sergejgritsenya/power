import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC, useMemo, useState } from "react"
import {
  TTournamentVideo,
  TTournamentVideoCreateProps,
} from "../../../common/types/tournament-types"
import { useAxios } from "../../layout/di-context"
import { ApplyRemoveDialog } from "../common/apply-remove-dialog"
import { NoElements } from "../common/no-elements"
import { useTournamentContext } from "./tournament"
import { tournamentVideoCreate, tournamentVideoDelete } from "./tournament-sdk"
import { TournamentVideoCreateModel, TournamentVideoModel } from "./tournament-video-model"

export const VideosList: FC = () => {
  const tournament = useTournamentContext()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const createVideo = async (data: TTournamentVideoCreateProps) => {
    tournament.setLoading(true)
    try {
      const res = await axios.sendPost<TTournamentVideo[]>(
        tournamentVideoCreate(tournament.id, data)
      )
      tournament.setVideos(res.data)
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
      const res = await axios.sendPost<TTournamentVideo[]>(
        tournamentVideoDelete(tournament.id, video_id)
      )
      tournament.setVideos(res.data)
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
  return useObserver(() => (
    <Card>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <CardHeader title="Video list" />
        </Grid>
        <Grid item>
          <VideoCreateDialog createVideo={createVideo} />
        </Grid>
      </Grid>
      <CardContent>
        <div>
          {tournament.videos.length ? (
            tournament.videos.map(video => (
              <VideoListItem video={video} deleteVideo={deleteVideo} key={video.id} />
            ))
          ) : (
            <NoElements />
          )}
        </div>
      </CardContent>
    </Card>
  ))
}

type TVideoCreateItemProps = {
  createVideo: (data: TTournamentVideoCreateProps) => void
}
const VideoCreateDialog: FC<TVideoCreateItemProps> = props => {
  const { createVideo } = props
  const classes = useStyles()
  const [open, setOpen] = useState<boolean>(false)
  const video = useMemo(() => {
    const model = new TournamentVideoCreateModel({})
    return model
  }, [])
  const create = () => {
    createVideo(video.json)
    setOpen(false)
    video.discard()
  }
  const close = () => {
    setOpen(false)
    video.discard()
  }
  return useObserver(() => (
    <div className={classes.create}>
      <Button color="primary" onClick={() => setOpen(true)}>
        Add
      </Button>
      <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
        <DialogTitle>Incorporate YouTube link</DialogTitle>
        <DialogContent>
          <TextField
            label="url"
            value={video.url}
            onChange={e => video.setUrl(e.target.value)}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={close}>
            Close
          </Button>
          <Button color="primary" onClick={create}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ))
}
type TVideoListItemProps = {
  video: TournamentVideoModel
  deleteVideo: (id: string) => void
}
const VideoListItem: FC<TVideoListItemProps> = props => {
  const { video, deleteVideo } = props
  const classes = useStyles()
  return (
    <div>
      <Grid container justify="space-between" alignItems="center" style={{ padding: "7px 0" }}>
        <Grid item xs={12} md={10}>
          <div className={classes.iframe} dangerouslySetInnerHTML={{ __html: video.url }} />
        </Grid>
        <Grid item xs={12} md={2} container justify="center">
          <ApplyRemoveDialog id={video.id} removeEntity={deleteVideo} entity_name="video" />
        </Grid>
      </Grid>
      <Divider />
    </div>
  )
}

const useStyles = makeStyles(
  theme => {
    return {
      create: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridColumnGap: "8px",
        margin: "8px 0",
      },
      iframe: {
        border: `1px solid ${theme.palette.common}`,
        "& iframe": {
          width: "100%",
          height: "400px",
          marginBottom: "-5px",
        },
      },
    }
  },
  { name: "VideoLisstItem" }
)

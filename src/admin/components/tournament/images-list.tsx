import { Card, CardContent, CardHeader, Divider, Grid } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import { useSnackbar } from "notistack"
import React, { FC } from "react"
import { TTournamentImage } from "../../../common/types/tournament-types"
import { useAxios } from "../../layout/di-context"
import { ApplyRemoveDialog } from "../common/apply-remove-dialog"
import { ImageItemUpload } from "../common/image-upload"
import { NoElements } from "../common/no-elements"
import { useTournamentContext } from "./tournament"
import { TournamentImageModel } from "./tournament-image-model"
import { tournamentImageDelete, tournamentImageUpload } from "./tournament-sdk"

export const ImagesList: FC = () => {
  const tournament = useTournamentContext()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const uploadImage = async (file: File) => {
    tournament.setLoading(true)
    try {
      const res = await axios.sendPost<TTournamentImage[]>(
        tournamentImageUpload(tournament.id, file)
      )
      tournament.setImages(res.data)
      tournament.setLoading(false)
      enqueueSnackbar("Succesfully uploaded", {
        variant: "success",
      })
    } catch (e) {
      tournament.setLoading(false)
      enqueueSnackbar("Error", {
        variant: "error",
      })
    }
  }
  const deleteImage = async (image_id: string) => {
    tournament.setLoading(true)
    try {
      const res = await axios.sendPost<TTournamentImage[]>(
        tournamentImageDelete(tournament.id, image_id)
      )
      tournament.setImages(res.data)
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
          <CardHeader title="Image list" />
        </Grid>
        <Grid item>
          <ImageItemUpload upload={uploadImage} />
        </Grid>
      </Grid>
      <CardContent>
        <div>
          {tournament.images.length ? (
            tournament.images.map(image => (
              <ImageListItem image={image} deleteImage={deleteImage} key={image.id} />
            ))
          ) : (
            <NoElements />
          )}
        </div>
      </CardContent>
    </Card>
  ))
}

type TImageListItemProps = {
  image: TournamentImageModel
  deleteImage: (id: string) => void
}
const ImageListItem: FC<TImageListItemProps> = props => {
  const { image, deleteImage } = props
  return (
    <div>
      <Grid container justify="space-between" alignItems="center" style={{ padding: "7px 0" }}>
        <Grid item xs={12} md={6}>
          <img src={image.url} alt={""} {...{ loading: "lazy" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ApplyRemoveDialog id={image.id} removeEntity={deleteImage} entity_name="image" />
        </Grid>
      </Grid>
      <Divider />
    </div>
  )
}

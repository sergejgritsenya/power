import { IncomingMessage } from "http"
import * as mime from "mime-types"
import { api_env } from "../server/env"
import { generateRandomStringToken } from "../util/generate-random-string"
import { AmazonS3Storage } from "./storage/AmazonS3Storage"
import { busboyParse } from "./storage/busboy"

export const uploadToS3 = async (req: IncomingMessage): Promise<string> => {
  const s3Storage = new AmazonS3Storage(api_env.S3_KEY, api_env.S3_SECRET, api_env.S3_IMAGES_BUCKET)
  const { file, mimetype } = await busboyParse(req)
  const name = generateRandomStringToken()
  const ext = mime.extension(mimetype) || "false"
  const url = await s3Storage.upload(file, mimetype, `${name}.${ext}`)
  return url
}

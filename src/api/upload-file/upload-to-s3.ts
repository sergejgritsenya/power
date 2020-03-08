import * as mime from "mime-types"
import { api_env } from "../server/env"
import { generateRandomStringToken } from "../util/generate-random-string"
import { AmazonS3Storage } from "./storage/AmazonS3Storage"

export const uploadToS3 = async (file: any): Promise<string> => {
  const s3Storage = new AmazonS3Storage(api_env.S3_KEY, api_env.S3_SECRET, api_env.S3_IMAGES_BUCKET)
  const { createReadStream, mimetype } = await file
  const stream = createReadStream()
  const name = generateRandomStringToken()
  const ext = mime.extension(mimetype) || "false"
  const filename = `${name}.${ext}`
  await s3Storage.upload(stream, mimetype, filename)
  return filename
}

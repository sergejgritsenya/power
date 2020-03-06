import Axios from "axios"
import { TWebpackAssetsManifestJson } from "chyk"

const { WDS_PORT, ASSETS_URL_BASE } = process.env

export enum EEntrypoint {
  "web" = "web",
  "admin" = "admin",
}
export const PUBLIC_OUTPUT_PATH = ASSETS_URL_BASE
  ? ASSETS_URL_BASE
  : WDS_PORT
  ? `http://localhost:${WDS_PORT}/dist/`
  : "/dist/"

export const WEBPACK_ASSETS_MANIFEST_FILENAME = "manifest.json"

export const getManifest = async (): Promise<TWebpackAssetsManifestJson<EEntrypoint>> =>
  WDS_PORT || ASSETS_URL_BASE
    ? await Axios(PUBLIC_OUTPUT_PATH + WEBPACK_ASSETS_MANIFEST_FILENAME).then(r => r.data)
    : "PROD_WEBPACK_ASSETS_MANIFEST_REPLACE"

require("dotenv").config()
import { Configuration } from "webpack"
import { Env } from "./src/api/server/env"

const { WDS_PORT, IS_PROD } = Env

const config: Configuration = {
  mode: IS_PROD ? "production" : "development",
  entry: {
    admin: "./src/admin/entry.tsx",
    web: "./src/web/entry.tsx",
  },
  output: {
    // filename: `[name].${IS_PROD ? "[hash:6]" : "[chunkhash:6]"}.js`,
    filename: `[name].js`,
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: { loader: "ts-loader" } }],
  },
  plugins: [],
  devServer: {
    port: WDS_PORT,
  },
}
export default config

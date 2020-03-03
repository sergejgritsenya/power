require("dotenv").config()
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import { resolve } from "path"
import { Configuration } from "webpack"
import { env } from "./src/api/server/env"

const { WDS_PORT, IS_PROD } = env

resolve(__dirname, "src")
const config: Configuration = {
  mode: IS_PROD ? "production" : "development",
  entry: {
    admin: "./src/admin/entry.ts",
    web: "./src/web/entry.tsx",
  },
  output: {
    // filename: `[name].${IS_PROD ? "[hash:6]" : "[chunkhash:6]"}.js`,
    filename: `[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
    }),
  ],
  devServer: {
    port: WDS_PORT,
  },
  devtool: IS_PROD ? "source-map" : "cheap-module-eval-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
}
export default config

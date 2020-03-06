require("dotenv").config()
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import { resolve } from "path"
import { Configuration } from "webpack"

const WDS_PORT = Number(process.env.WDS_PORT) || 3089
const IS_PROD = process.env.NODE_ENV === "production"

resolve(__dirname, "src")
const config: Configuration = {
  mode: IS_PROD ? "production" : "development",
  entry: {
    admin: "./src/admin/index.ts",
    web: "./src/web/index.tsx",
  },
  output: {
    // filename: `[name].${IS_PROD ? "[hash:8]" : "[chunkhash:8]"}.js`,
    filename: `[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              target: IS_PROD ? "ES2015" : "ES2018",
            },
          },
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
  devtool: IS_PROD ? "source-map" : "#cheap-eval-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
}
export default config

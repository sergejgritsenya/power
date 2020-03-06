require("dotenv").config()
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import { join, resolve } from "path"
import { Configuration } from "webpack"
import WebpackAssetsManifest from "webpack-assets-manifest"
import { PUBLIC_OUTPUT_PATH } from "./src/common/config"

const { APP_NAME, NODE_ENV } = process.env
const WDS_PORT = Number(process.env.WDS_PORT) || 3089
const IS_PROD = NODE_ENV === "production"

resolve(__dirname, "src")
const stats: Configuration["stats"] = {
  warningsFilter: /export .* was not found in/,
  colors: true,
}
const PUBLIC_DIR = join(__dirname, "public")
const DIST_DIR = resolve(PUBLIC_DIR, "dist")

let entry: Configuration["entry"]
if (APP_NAME === "admin") {
  entry = {
    admin: "./src/admin/index.ts",
  }
} else if (APP_NAME === "web") {
  entry = {
    web: "./src/web/index.tsx",
  }
} else {
  entry = {
    admin: "./src/admin/index.ts",
    web: "./src/web/index.tsx",
  }
}
const config: Configuration = {
  mode: IS_PROD ? "production" : "development",
  entry,
  output: {
    filename: `[name]${IS_PROD ? ".[chunkhash:6]" : ".[hash:6]"}.js`,
    chunkFilename: `[name].[chunkhash:6].js`,
    path: DIST_DIR,
    publicPath: PUBLIC_OUTPUT_PATH,
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            happyPackMode: true,
            compilerOptions: {
              target: IS_PROD ? "ES2015" : "ES2018",
            },
            experimentalWatchApi: true,
          },
        },
        exclude: [/node_modules/],
        include: resolve(__dirname, "src"),
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        default: false as any,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          minChunks: 2,
        },
        commons: {
          name: "commons",
          chunks: "async",
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
    }),
    new WebpackAssetsManifest({
      entrypoints: true,
    }),
  ],
  devServer: {
    contentBase: PUBLIC_DIR,
    disableHostCheck: true,
    publicPath: PUBLIC_OUTPUT_PATH,
    compress: false,
    port: Number(WDS_PORT),
    stats,
    liveReload: false,
  },
  devtool: IS_PROD ? "source-map" : "#cheap-eval-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    symlinks: false,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
}
export default config

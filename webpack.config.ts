require("dotenv").config()
import { Configuration } from "webpack"

const config: Configuration = {
  entry: {
    admin: "./src/admin/entry.tsx",
    // web: "src/web/entry.tsx",
  },
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: { loader: "ts-loader" } }],
  },
  plugins: [],
}
export default config

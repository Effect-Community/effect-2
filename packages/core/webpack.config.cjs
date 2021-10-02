/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")
const webpack = require("webpack")

/* eslint-disable no-undef */
module.exports = {
  mode: "production",
  entry: "./lib/index.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].cjs"
  },
  plugins: [
    new webpack.DefinePlugin({
      ETS_PLUGIN: JSON.stringify(false)
    })
  ]
}

const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    server: ["@babel/polyfill", "./src/index.js"]
  },
  output: {
    path: path.join(__dirname, "src", "dist"),
    publicPath: "/",
    filename: "index.js"
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

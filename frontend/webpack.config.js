const webpack = require("webpack");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");

module.exports = {
  mode: "development", //"development",//
  context: __dirname,
  entry: {
    appOS: {
      import: "./src/indexAppOS.js",
      // dependOn: "shared"
    },
    /*  appAdminAccount: {
            import: "./src/AppAdminAccount.js",
            dependOn: "shared"
        },*/

    /*shared: [
            "@emotion/react",
            "@emotion/styled",
            "@material-ui/core",
            "@mui/icons-material",
            "@mui/material",
            "react",
            "react-dom",
            "axios",
            "react-router-dom",
            "use-debounce",
            "yup",
            "formik"
        ],*/
  },
  output: {
    path: undefined,
    publicPath: "/dist/public/js",
    filename: "public/js/[name].js",
    // chunkFilename: "static/js/[name].chunk.js",
    clean: true,
  },
  watch: true,
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom",
    }),
    //new BundleAnalyzerPlugin()
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src/"),
      components: path.resolve(__dirname, "./src/components/"),
      hooks: path.resolve(__dirname, "./src/hooks/"),
      main: path.resolve(__dirname, "./src/main/"),
      theme: path.resolve(__dirname, "./src/theme/"),
      pages: path.resolve(__dirname, "./src/pages/"),
      //context: path.resolve(__dirname, "./src/context/"),
      helper: path.resolve(__dirname, "./src/helper/"),
      assets: path.resolve(__dirname, "./src/assets/"),
    },
  },
};

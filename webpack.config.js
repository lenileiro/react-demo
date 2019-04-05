var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlplugin = new HtmlWebPackPlugin({
  template: "./index.html",
  filename: "./index.html"
})

var browserConfig = {
  entry: './app/hydrate.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader' },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]
}

var serverConfig = {
  entry: './app/ssr.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, 
        exclude: /node_modules/,
        use: 'babel-loader' 
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}

var developClient = (env) => {
  return {
    entry: './app/index.js',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },

    module: {
      rules: [
        { test: /\.(js)$/, use: 'babel-loader' },
      ]
    },

    plugins: [
      htmlplugin,
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
        'process.env.CLIENT': JSON.stringify(env.CLIENT)
      })
    ]
  }
}

let webpackConfig = (env) => {
  // check environment --env.CLIENT=development
  var client = process.env.CLIENT || "development";

  if(client == 'development') {
    return developClient(env)
  }
  else if(client == 'build') {
    return browserConfig
  }
  else if(client == 'production'){
    return [browserConfig, serverConfig]
  }
}
module.exports = webpackConfig
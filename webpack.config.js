var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlplugin = new HtmlWebPackPlugin({
  template: "./index.html",
  filename: "./index.html"
})

var browserConfig = {
    entry: './app/index.js',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },

    module: {
      rules: [
        { test: /\.(js)$/, 
          use: 'babel-loader' 
        },
        {
          test: /\.(css)$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },

    plugins: [
      htmlplugin,
    ]
}

var hydrateConfig = {
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
          use: 'babel-loader' 
        },
        {
          test: /\.(css)$/,
          use: ["style-loader", "css-loader"]
        }
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
        },
        {
          test: /\.(css)$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "false"
      })
    ]
}


let webpackConfig = (env) => {
  // check environment --env.CLIENT=development

  if(env.CLIENT == 'development') {
    return browserConfig
  }
  else if(env.CLIENT == 'build') {
    return browserConfig
  }
  else if(env.CLIENT == 'production'){
    return [hydrateConfig, serverConfig]
  }
}
module.exports = webpackConfig
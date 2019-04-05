var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlplugin = new HtmlWebPackPlugin({
  template: "./index.html",
  filename: "./index.html"
})

var browserConfig = (env) => {
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
        'process.env.CLIENT': JSON.stringify(env.CLIENT)
      })
    ]
  }
}

var hydrateConfig = (env) => {
  return {
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
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
        'process.env.CLIENT': JSON.stringify(env.CLIENT)
      })
    ]
  }
}

var serverConfig = env => {
  return{
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
}


let webpackConfig = (env) => {
  // check environment --env.CLIENT=development
  var client = env.CLIENT;

  console.log(env)

  if(client == 'development') {
    return browserConfig(env)
  }
  else if(client == 'build') {
    return browserConfig(env)
  }
  else if(client == 'production'){
    return [hydrateConfig(env), serverConfig(env)]
  }
}
module.exports = webpackConfig
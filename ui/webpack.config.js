const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const assetPath = 'static'

const basePlugins = [
  new HtmlWebpackPlugin({
    inject: false,
    template: require('html-webpack-template'),
    lang: 'en-US',
  })
]

const devPlugins = [
  // enable HMR globally
  new webpack.HotModuleReplacementPlugin(),

  // prints more readable module names in the browser console on HMR updates
  new webpack.NamedModulesPlugin(),
]

const prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  })
]

const devEntryPoints = [
  'babel-polyfill',

  // bundle the client for webpack-dev-server and connect to the provided endpoint
  'webpack-dev-server/client?http://localhost:8080',

  // bundle the client for hot reloading hot reload for successful updates
  'webpack/hot/only-dev-server',

  './frontend/index.js',
]

const prodEntryPoints = [
  'babel-polyfill',
  './frontend/index.js',
]

module.exports = env => {
  return {
    entry: isProd ? prodEntryPoints : devEntryPoints,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    devServer: isProd ? {} : {
      publicPath: '/',
      historyApiFallback: {
        index: '/',
      },
      disableHostCheck: true,
      hot: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          // pathRewrite: {'^/api' : ''}
        }
      }
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          use: 'eslint-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              babelrcRoots: ['.', '../'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
          ],
        },

        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                hash: 'sha512',
                digestType: 'hex',
                name: '[hash].[ext]',
                outputPath: `${assetPath}/img`,
              },
            },
          ],
        },
        {
          test: /\.(ico)$/,
          exclude: /node_modules/,
          include: /img/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: assetPath,
              },
            },
          ],
        },
        {
          test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '/[name].[ext]',
                outputPath: `${assetPath}/fonts`,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      // add a dir to search that takes precedence over node_modules
      modules: ['node_modules'],
      extensions:
          ['.js', '.jsx'],
      unsafeCache:
          !isProd,
    }
    ,
    plugins: isProd ? basePlugins.concat(prodPlugins) : basePlugins.concat(devPlugins),
  }
}

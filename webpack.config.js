const path = require('path')

module.exports = {
  entry: './lib/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/',
    port: 3000,
    watchContentBase: true
  },
  devtool: 'sourcemap'
}

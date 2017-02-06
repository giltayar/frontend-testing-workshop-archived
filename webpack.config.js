const path = require('path')

module.exports = {
  entry: './lib/app.js',
  output: {
    filename: './dist/bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000
  }
}

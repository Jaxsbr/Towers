var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/game.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      { test: /\.(png|json|ico)$/, loader: 'file-loader' }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
    },
    host: '127.0.0.1',
    port: 323,
    open: true,
    hot: false
  },
  resolve: {
    extensions: ['.ts', '.js'],    
  }
};

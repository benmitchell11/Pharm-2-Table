const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'server', 'public'), // Adjust the output path
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader', // Translates CSS into CommonJS
          {
            loader: 'sass-loader', // Compiles Sass to CSS
            options: {
              implementation: require('sass') // Use Dart Sass
            }
          }
        ]
      }
      
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'server', 'public'), // Specify the content base
    publicPath: '/dist/' // Specify the public path
  }
};

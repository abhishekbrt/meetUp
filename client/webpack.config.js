const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // Add loaders for JavaScript, CSS, etc.
    ],
  },
  plugins: [
    new Dotenv()
    // Add other plugins as needed
  ],
};

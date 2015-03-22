module.exports = {
  cache: true,

  watch: true,

  entry: {
    'app': ['./js/react/app.js']
  },

  output: {
    filename: '[name].js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader!transform/cacheable?envify' },
    ]
  },

  resolve: {
    root: __dirname,
    alias: {
      'react-canvas': 'lib/ReactCanvas.js'
    }
  }
};

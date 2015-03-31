module.exports = {
  cache: true,

  watch: true,

  entry: {
    'app': ['./js/react/app.js'],
    'example': ['./js/react/example.js']
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
      'react-canvas': 'react-canvas/ReactCanvas.js'
    }
  }
};

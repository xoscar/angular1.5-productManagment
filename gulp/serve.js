const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.js');
const WebpackDevServer = require('webpack-dev-server');

gulp.task('serve', (done) => {
  new WebpackDevServer(webpack(webpackConfig()), {
    publicPath: '/',
    contentBase: './app',
    stats: { colors: true },
    proxy: {
      '/spa': {
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/spa': '',
        },
      },
    },
  }).listen(9000, '0.0.0.0', (err) => {
    if (err) throw new Error(err);
    gutil.log('[serve]', 'Open http://localhost:9000/index.html');

    // keep the server alive or continue?
    done();
  });
});

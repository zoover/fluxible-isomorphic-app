var gulp = require('gulp'); // Used for running automated tasks
var browserify = require('browserify'); // Bundles JS and includes modules that are required by your code
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream')

var config = {
  entry_file: './client.js',
  destination_folder: './build/',
  destination_file: 'bundle.js'
}

gulp.task('build', function() {
  browserify(config.entry_file)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.destination_folder));
});

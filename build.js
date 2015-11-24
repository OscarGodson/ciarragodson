var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var layouts = require('metalsmith-layouts');
var cleanCSS = require('metalsmith-clean-css');
var autoprefixer = require('metalsmith-autoprefixer');
var concat = require('metalsmith-concat');

Metalsmith(__dirname)
  // Processes markdown and converts them to HTML (NOT WORKING WTF)
  .use(markdown({ gfm: true }))

  // Nest files in folders so we can get URLs like site.com/about and turn off
  // nesting of asset files since all assets are linked to the root / dir
  .use(permalinks({pattern: ':url', relative: false}))

  // Layouts lets you specify a template file to wrap up your content files in
  // and lets you use things like partials.
  .use(layouts({engine: 'handlebars', partials: 'layouts/partials'}))

  // Adds browser vendor prefixes to the CSS
  .use(autoprefixer())
  
  // Minifies CSS
  .use(cleanCSS())

  // Concat all our CSS
  .use(concat({
    files: 'public/**/*.css',
    output: 'public/css/built.css'
  }))

  // Concat all our JS
  .use(concat({
    files: [
      'public/js/jquery-2.1.4.min.js',
      'public/js/jquery.slides.min.js',
      'public/js/lightbox.min.js',
      'public/js/masonry.pkgd.min.js',
      'public/js/main.js'
    ],
    output: 'public/js/built.js'
  }))

  // Build all the files into /build
  .build(function(err) {
    if (err) throw err;
  });

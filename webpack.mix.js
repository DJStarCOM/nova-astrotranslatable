let mix = require('laravel-mix');

mix
  .setPublicPath('dist')
  .js('./resources/js/translatable-field.js', 'js/nova-translatable.js')
  .vue({ version: 3 })
  .webpackConfig({
    externals: {
      vue: 'Vue',
      'laravel-nova': 'LaravelNova'
    },
    output: {
      uniqueName: 'djstarcom/nova-translatable',
    },
  })

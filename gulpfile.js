var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');

    mix.styles([
        'font-awesome/css/font-awesome.min.css'
        ], 'public/css/vendor.css', 'node_modules');

    mix.browserify('rateList.js', 'resources/assets/js/bundle.js');

    mix.scripts([
    	'jquery/dist/jquery.min.js',
    	'bootstrap-sass/assets/javascripts/bootstrap.min.js',
    	'vue/dist/vue.min.js',
    	'vue-resource/dist/vue-resource.min.js'
    	], 'public/js/vendor.js', 'node_modules');

    mix.scripts([
        'myrateLists.js',
        'bundle.js'
        ], 'public/js/app.js');
});


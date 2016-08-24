module.exports = {
  "bundles": {
    "dist/vendor-build": {
      "includes": [
        "dist/**/*.js",
        "[**/*.js]",
        "**/*.html!text",
        "**/*.css!text"
      ],
      excludes: [
        // 'config.js',
        // '/Content/Assets/css/buttons/buttons.css!text',
        // '/Content/Assets/css/buttons/social-icons.css!text',
        // '/Content/Assets/css/buttons/animation.css!text',
        // '/Content/Assets/css/bootstrap.min.css!text',
        // '/Content/Assets/css/jslider.css!text',
        // '/Content/Assets/css/settings.css!text',
        // '/Content/Assets/css/jquery.fancybox.css!text',
        // '/Content/Assets/css/animate.css!text',
        // '/Content/Assets/css/style.css!text',
        // '/Content/Assets/css/responsive.css!text',
        // '/Content/Assets/css/pages.css!text',
        // '/Content/Assets/css/layout.css!text',
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": true,
        "rev": false
      }
    },
    "dist/aurelia": {
      "includes": [
        "ashleydw/lightbox",
        "aurelia-animator-css",
        "aurelia-api",
        "aurelia-bootstrapper",
        "aurelia-fetch-client",
        "aurelia-framework",
        "aurelia-history-browser",
        "aurelia-http-client",
        "aurelia-loader-default",
        "aurelia-logging",
        "aurelia-logging-console",
        "aurelia-notify",
        "aurelia-orm",
        "aurelia-router",
        "aurelia-templating-binding",
        "aurelia-templating-resources",
        "aurelia-templating-router",
        "aurelia-templating",
        "aurelia-validation",

        "babel",
        // "babel-runtime",
        "bootstrap",
        // "core-js",
        "css",
        "desandro/imagesloaded",
        // "fetch",
        // "font-awesome",
        // "gooy/aurelia-animator-velocity",
        "jquery",
        // "jquery-confirm",
        "masonry-layout",
        "text",
        // "velocity",

        // "ev-emitter",
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": false,
        "rev": false
      }
    }
  }
};
'use strict';
module.exports = function ( gulp, plugins, config, pkg, bwr ) {


    /**
     * Re-load config file
     */
    gulp.task( 'reload-config', 'Require new config after changes on config.json', function () {

            var modernizrOptions = config.modernizrOptions;
            delete require.cache[ require.resolve( '../config.json' ) ];
            delete require.cache[ '../config.json' ];
            config = require( '../config.json' );
            config.modernizrOptions = modernizrOptions;
            plugins.util.log( plugins.util.colors.inverse.bold( 'Theme: ' + config.bootstrapTheme ) );

            plugins.runSequence(
                [
                    'clean-base-src',
                    'clean-vendor',
                    'clean-theme-css',
                    'clean-css',
                    'clean-imagemin'
                ],
                [
                    'copy-base-src',
                    'build-sass',
                    'build-vendors',
                    'build-imagemin'
                ],
                [
                    'reload-modernizr-options'
                ]
            );
        }
    );
};
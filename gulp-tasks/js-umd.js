'use strict';
module.exports = function ( gulp, plugins, config, pkg, bwr ) {

    gulp.task( 'build-js-umd', 'Build javascript file from UMD javascript modules sources', function () {
            config.env = plugins.tools.getEnv( config );
            return gulp.src( config.srcPath + '/' + config.javascript.dir + '/' + config.javascript.subdir.umd + '/**/*.js' )
                .pipe( plugins.plumber( { errorHandler: plugins.tools.errorHandler } ) )
                .pipe( plugins.gulpif( config.env.dev, plugins.sourcemaps.init() ) )
                .pipe( plugins.umd( {
                        dependencies: function ( file ) {
                            return [
                                {
                                    name: 'MyModule',
                                    amd: 'MyModule_amd',
                                    cjs: 'MyModule_cjs',
                                    global: 'MyModule_glob',
                                    param: 'MyModule'
                                }, {
                                    name: 'App',
                                    amd: 'App_amd',
                                    cjs: 'App_cjs',
                                    global: 'App_glob',
                                    param: 'App'
                                }
                            ];
                        }
                    }
                    )
                )
                .pipe( plugins.gulpif( config.env.prod, plugins.uglify( plugins.uglifyOptions ) ) )
                .pipe( plugins.concat( config.javascript.outputFile + '.min.js' ) )
                .pipe( plugins.gulpif( config.env.dev, plugins.sourcemaps.write() ) )
                .pipe( plugins.header( plugins.tools.banner, { pkg: pkg } ) )
                .pipe( gulp.dest( config.publicPath + '/' + config.javascript.dir + '/' + config.javascript.subdir.umd ) );
        }
    );


    gulp.task( 'watch-js-umd', 'Watch UMD modules javascript files', function () {
            config.env.dev = true;
            config.env.prod = false;
            plugins.runSequence(
                [ 'jscpd', 'jshint', 'build-js-umd' ],
                function () {
                    plugins.tools.watch( config.srcPath + '/' + config.javascript.dir + '/' + config.javascript.subdir.umd + '/**/*.js', [ 'jscpd', 'jshint', 'build-js-umd' ] );

                }
            );
        }
    );
};
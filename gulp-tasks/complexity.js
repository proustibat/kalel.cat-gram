"use strict";
module.exports = function ( gulp, plugins, config, pkg, bwr ) {
    gulp.task( 'complexity', 'Run software complexity analysis', function () {
            return gulp.src( config.srcPath + '/' + config.jsDir + '/**/*.js' )
                .pipe( plugins.complexity( {
                        cyclomatic: [ 3, 7, 12 ],
                        halstead: [ 8, 13, 20 ],
                        maintainability: 100,
                        breakOnErrors: false,
                        verbose: true
                    }
                    )
                );
        }
    );
};
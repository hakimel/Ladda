module.exports = function(grunt) {
	'use strict';

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			main: {
				options: {
					outputStyle: 'compressed',
				},
				files: {
					'dist/ladda.min.css': [ 'css/ladda-themed.scss' ],
					'dist/ladda-themeless.min.css': [ 'css/ladda.scss' ]
				}
			}
		},

		jshint: {
			options: {
				// enforcing
				esversion: 6,
				curly: true,
				eqeqeq: true,
				freeze: true,
				futurehostile: true,
				globals: {
					module: false,
					console: false,
					define: false
				},
				latedef: "nofunc",
				maxparams: 3,
				noarg: true,
				nocomma: true,
				nonbsp: true,
				nonew: true,
				undef: true,
				unused: true,
				// environments
				browser: true,
				node: true,
			},
			files: [ 'Gruntfile.js', 'js/ladda.js' ]
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: '.',
				}
			}
		},

		watch: {
			main: {
				files: [ 'Gruntfile.js', 'js/ladda.js' ],
				tasks: 'js',
				options: {
					livereload: true,
				},
			},
			theme: {
				files: [ 'css/*.scss' ],
				tasks: 'css',
				options: {
					livereload: true,
				},
			}
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	// Default task
	grunt.registerTask( 'default', [ 'js', 'css' ] );

	// Theme task
	grunt.registerTask( 'js', [ 'jshint' ] );
	grunt.registerTask( 'css', [ 'sass' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );
};

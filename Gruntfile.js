/* global module:false */
module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * Ladda <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://lab.hakim.se/ladda\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2013 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		uglify: {
			main: {
				options: {
					banner: '<%= meta.banner %>\n'
				},
				files: {
					'dist/ladda.min.js': 'js/ladda.js'
				}
			},
			lib: {
				options: {
					preserveComments: 'some'
				},
				files: {
					'dist/spin.min.js': 'js/spin.js'
				}
			}
		},

		sass: {
			main: {
				options: {
					style: 'compressed'
				},
				files: {
					'dist/ladda.min.css': [ 'css/ladda.scss', 'css/ladda-theme.scss' ],
					'dist/ladda-themeless.min.css': [ 'css/ladda.scss' ]
				}
			}
		},

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				loopfunc: true,
				globals: {
					head: false,
					module: false,
					console: false,
					define: false
				}
			},
			files: [ 'Gruntfile.js', 'js/ladda.js' ]
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: '.'
				}
			}
		},

		watch: {
			main: {
				files: [ 'Gruntfile.js', 'js/ladda.js' ],
				tasks: 'js'
			},
			theme: {
				files: [ 'css/ladda.scss' ],
				tasks: 'css'
			}
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	// Default task
	grunt.registerTask( 'default', [ 'js', 'css' ] );

	// Theme task
	grunt.registerTask( 'js', [ 'jshint', 'uglify' ] );
	grunt.registerTask( 'css', [ 'sass' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

};

/*
 * grunt-include-file
 * https://github.com/Sjeiti/grunt-include-file
 *
 * Copyright (c) 2014 Ron Valstar
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js','tasks/*.js','<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		include_file: {
			default_options: {
				cwd: 'test/fixtures/',
				src: ['index.html'],
				dest: 'tmp/'
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}


		,version_git: {
			main: {
				files: {src:[
					'tasks/include_file.js'
					,'package.json'
				]}
			}
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-version-git');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test',['clean','include_file','nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default',['jshint','test']);

};

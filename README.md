# grunt-include-file

> Include files into other files, including base64 encoding.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-include-file --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-include-file');
```

In your project's Gruntfile, add a section named `include_file` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  include_file: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

## The "include_file" task

### Overview

You can include anything into anything through a block-comment:

```html
<!-- include content.html -->
```

```js
/*include somefile.js*/
```

```less
/*! include -b image.png */
```

### Options

You can add parameters to the comment.

#### escape quotes
Param: `-e`

#### encodeURIComponent
Param: `-u`

#### base64 encoding
Param: `-b`

#### maintain use strict
Param: `-ms`

### Usage Examples

#### Default Options

```js
grunt.initConfig({
	include_file: {
		default_options: {
			cwd: 'test/fixtures/',
			src: ['index.html'],
			dest: 'tmp/'
		}
	}
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

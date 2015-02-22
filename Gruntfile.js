module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower_concat: {
        all: {
            dest: '_/components/javascripts/_bower.js',
            cssDest: '_/components/styles/_bower.css',
            bowerOptions: {
                relative: false
            }
        }
    },
	concat: {
	    options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        prod_js: {
            src: [
                '_/components/javascripts/_bower.js',
                '_/components/javascripts/my_working.js' // My js compiled from coffee script
            ],
            dest: '_/components/javascripts/_main.js'
        },
	    prod_css: {
	        src: ['_/components/styles/_bower.css', 
				  'bower_components/jquery-ui/themes/ui-lightness/jquery-ui.css',
                  '_/components/styles/less.css',
                  '_/components/styles/sass.css' // JQuery UI '_/components/styles/jquery-ui.css'
                 ],
            dest: '_/components/styles/_style.css'
	    },
        dev_js: {
            src: [
                '_/components/javascripts/_bower.js',
                '_/components/javascripts/my_working.js' // My js compiled from coffee script
            ],
            dest: '_/javascripts/main.min.js'
        }, 
        dev_css: {
            src: ['_/components/styles/_bower.css',
				  '_/components/styles/jquery-ui.css',
                  '_/components/styles/less.css',
                  '_/components/styles/sass.css' // JQuery UI '_/components/styles/jquery-ui.css'
                 ],
            dest: '_/styles/style.min.css'
        }
	},
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
            src: '_/components/javascripts/_main.js',
            dest: '_/javascripts/main.min.js'
        }
    },
    cssmin: {
        build: {
            src: '_/components/styles/_style.css',
            dest: '_/styles/style.min.css'
        }
    },
	coffee: {
		options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
            src: '_/components/javascripts/working/my_working.coffee',
            dest: '_/components/javascripts/my_working.js'
        }
	},
	haml: {
		options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			language: 'coffee'
        },
        index: {
            src: '_/components/views/index.haml',
            dest: 'index.php'
        },
        header: {
            src: '_/components/views/layouts/header.haml',
            dest: '_/views/layouts/header.php'
        },
        footer: {
            src: '_/components/views/layouts/footer.haml',
            dest: '_/views/layouts/footer.php'
        }
	},
	less: {
		options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
            src: '_/components/styles/working/less.less',
            dest: '_/components/styles/less.css'
        },
		bootstrap: {
			src: 'bower_components/bootstrap/less/bootstrap.less',
			dest: 'bower_components/bootstrap/dist/css/bootstrap.css'
		}
	},
	sass: {
		options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			compass: true,
			style: 'expanded',
			debugInfo: false
        },
		build: {
            src: '_/components/styles/working/sass.sass',
            dest: '_/components/styles/sass.css'
        }
	},
	compass: {
		options: {
            sassDir: '_/components/styles',
			cssDir: '_/css'
        }
	},
	watch: { // grunt watch для запуска отслеживания
        p: {
            files: ["_/components/views/*.haml", 
                    "_/components/views/layouts/*.haml", 
                    "_/components/styles/working/*.sass",
                    "_/components/styles/working/*.less",
                    "bower_components/bootstrap/less/*.less",
                    "_/components/javascripts/working/*.coffee"
                   ],
            tasks: ['haml', 'sass', 'less', 'coffee', 'bower_concat', 'concat:prod_js', 'concat:prod_css', 'uglify', 'cssmin']
        },
        d: {
            files: ["_/components/views/*.haml", 
                    "_/components/views/layouts/*.haml", 
                    "_/components/styles/working/*.sass",
                    "_/components/styles/working/*.less",
                    "bower_components/bootstrap/less/*.less",
                    "_/components/javascripts/working/*.coffee"
                   ],
            tasks: ['haml', 'sass', 'less', 'coffee', 'bower_concat', 'concat:dev_js', 'concat:dev_css']
        },
		views: {
			files: ["_/components/views/*.haml", "_/components/views/layouts/*.haml"],
			tasks: 'haml'
		},
        styles: {
            files: ["_/components/styles/working/*.sass", 
                    "bower_components/bootstrap/less/*.less", 
                    "_/components/styles/working/*.less"
                   ],
            tasks: ['sass', 'less', 'bower_concat', 'concat:dev_css', 'cssmin']
        },
        scripts: {
            files: "_/components/javascripts/working/*.coffee",
			tasks: ['coffee', 'concat:dev_js', 'uglify']
        }
	}
  });

  // Load the plugin that provides the "uglify" task.
  //require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-haml');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['compass', 'coffee', 'less', 'sass', 'haml', 'bower_concat', 'concat:prod_js', 'concat:prod_css', 'uglify', 'cssmin']);

};
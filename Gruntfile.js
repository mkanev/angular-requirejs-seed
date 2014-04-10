module.exports = function (grunt) {

  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    src: {
      js: 'app/js/**/*.js',
      less: 'app/less/**/*.less',
      templates: 'app/partials/**/*.html'
    },
    build: {
      dest: 'dist',
      tmp: '.tmp'
    },

    clean: ['<%= build.dest %>'],

    less: {
      src: {
        files: {
          "app/css/app.css": "app/less/style.less"
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['Gruntfile.js', '<%= src.js %>']
    },

    watch: {
      js: {
        files: '<%= jshint.files %>',
        tasks: ['prepareSripts']
      },
      less: {
        files: '<%= src.less %>',
        tasks: ['prepareStyles']
      }
    },

    connect: {
      web: {
        options: {
          port: 9000,
          bases: '.',
          keepalive: true
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['watch', 'web'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // Load JSHint task
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task.
  grunt.registerTask('prepareSripts', ['jshint']);
  grunt.registerTask('prepareStyles', ['less']);
  grunt.registerTask('web', ['connect:web']);
  grunt.registerTask('default', ['clean', 'prepareSripts', 'prepareStyles', 'concurrent:dev']);
};
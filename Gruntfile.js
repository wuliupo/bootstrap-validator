/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['validator.js']
      },
      test: {
        src: ['tests/unit/*.js']
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      min: {
        src: ['validator.js'],
        dest: 'validator.min.js'
      }
    },

    qunit: {
      options: {
        inject: 'tests/unit/phantom.js'
      },
      files: ['tests/*.html']
    },

    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    },

    validation: {
      options: {
        reset: true,
        relaxerror: [
          "Bad value X-UA-Compatible for attribute http-equiv on element meta.",
          "Element img is missing required attribute src."
        ]
      },
      files: {
        src: ["docs/*.html"]
      }
    }
  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-sed');

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['validation']);

  // Test task.
  grunt.registerTask('test', ['jshint', 'qunit']);

  // Docs distribution task.
  grunt.registerTask('dist-docs');

  // Distribution task.
  grunt.registerTask('dist', ['concat', 'uglify', 'dist-docs']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist']);

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', ['sed']);
};
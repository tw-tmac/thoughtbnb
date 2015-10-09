module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    simplemocha: {
      options: {
        reporter: 'spec'
      },
      all: { src: ['test/integration/*.js'] }
    },
    jshint: {
      all: [
        'app.js',
        'config.js',
        'Gruntfile.js',
        'models',
        'public/scripts/*.js',
        '!public/scripts/*.min.js',
        'routes',
        'views/*.js',
        'test'
      ],
      options: {
        '-W030': true,
        '-W069': true
      }

    }
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'simplemocha']);
  grunt.registerTask('test', ['simplemocha']);
};

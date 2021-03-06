'use strict';

var gulp = require('gulp');
var download = require('gulp-download');
var eslint = require('gulp-eslint');
var jshint = require('gulp-jshint');
var nsp = require('gulp-nsp');
var path = require('path');
var yaml = require('gulp-yaml');

var grammarYAMLUrl = 'https://raw.githubusercontent.com/casualsequence/TypeScript-TmLanguage/master/TypeScript.YAML-tmLanguage';

gulp.task('jshint', function() {
    return gulp.src('**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('eslint', function() {
    return gulp.src('**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('nsp', function(cb) {
    nsp({package: path.resolve('package.json')}, cb);
});

// gulp.task('download-grammar-yaml')


gulp.task('update-grammar', function() {
    return download(grammarYAMLUrl)
        .pipe(yaml({
            schema: 'DEFAULT_FULL_SCHEMA',
            space: 2,
            filename: 'typescript.json'
        }))
        .pipe(gulp.dest('./syntaxes/'));
});

gulp.task('update-local-grammar', function() {
    return gulp.src('./TypeScript.yaml')
        .pipe(yaml({
            schema: 'DEFAULT_FULL_SCHEMA',
            space: 2,
            filename: 'typescript.json'
        }))
        .pipe(gulp.dest('./syntaxes/'));
});
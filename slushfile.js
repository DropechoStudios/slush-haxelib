'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer');

var prompts = require('./slush/default/prompts.js');

function getExcludedLicense(answers) {
    var excludedLicense = answers.license === 'MIT' ? 'LICENSE_BSD' : 'LICENSE_MIT';

    return '!' + __dirname + '/templates/' + excludedLicense;
}

function defaultTask(done) {
    function scaffold(answers) {
        if (!answers.moveon) {
            return done();
        }

        answers.year = new Date().getFullYear();
        answers.appNameSlug = _.slugify(answers.appName);
        var files = [__dirname + '/templates/**'];
        files.push(getExcludedLicense(answers));

        gulp.src(files)
            .pipe(template(answers))
            .pipe(rename(function(file) {
                if (answers.license === 'MIT') {
                    file.basename = file.basename.replace('LICENSE_MIT', 'LICENSE');
                } else {
                    file.basename = file.basename.replace('LICENSE_BSD', 'LICENSE');
                }
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
            //.pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .pipe(install())
            .on('finish', function() {
                done();
            });
    }

    inquirer.prompt(prompts, scaffold);
}

gulp.task('default', defaultTask);

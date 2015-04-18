'use strict';
var chai = require('chai'), //chai for assertion
    gulp = require('gulp'),
    mockGulpDest = require('mock-gulp-dest')(gulp), //here is our dest stub
    expect = chai.expect; //I use expect, but I dont expect(you).to.also()

//this is to mock inquirer
var mockPrompt = require('./inquirer-prompt-fixture');

//and the thing we are testing
require('../slushfile');

describe('Given the slush generator',function() {

    describe('When we have answers', function() {

        //before each of these mocks, I need to provide mock data for what might have been responses
        beforeEach(function() {
            mockPrompt({
                appName: 'test-app',
                userName: 'the-simian',
                authorName: 'Fancypants Harlin',
                authorEmail: 'derp@derp.derp',
                appDescription: 'some description',
                appVersion: '0.1.0',
                license: 'MIT',
                moveon: true
            });
        });

        it('should make a readme', function(done) {

            function assertDirectories() {
                mockGulpDest.assertDestContains('README.md');
                done();
            }

            //here's the tricky part....
            gulp
                .start('default')
                .once('task_stop', assertDirectories);
        });

        it('should make a package.json', function(done) {

            function assertDirectories() {
                mockGulpDest.assertDestContains('package.json');
                done();
            }

            gulp
                .start('default')
                .once('task_stop', assertDirectories);
        });

    });
});

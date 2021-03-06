'use strict';

var defaults = require('./defaults');

module.exports = [
  {
    name: 'appName',
    message: 'What is the name of your project?',
    default: defaults.appName
  }, {
    name: 'appDescription',
    message: 'What is the description?'
  }, {
    name: 'appVersion',
    message: 'What is the version of your project?',
    default: '0.1.0'
  }, {
    name: 'authorName',
    message: 'What is the author name?',
    default: defaults.authorName
  }, {
    name: 'authorEmail',
    message: 'What is the author email?',
    default: defaults.authorEmail
  }, {
    name: 'userName',
    message: 'What is the github username/organization name?',
    default: defaults.userName
  }, {
    type: 'list',
    name: 'license',
    message: 'Choose your license type',
    choices: ['MIT', 'BSD'],
    default: 'MIT'
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Continue?'
  }
];

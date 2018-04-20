# Frontvue-Plugin-Stylus

[![Build Status](https://travis-ci.org/0vidiu/frontvue-plugin-stylus.svg?branch=master)](https://travis-ci.org/0vidiu/frontvue-plugin-stylus) [![codecov](https://codecov.io/gh/0vidiu/frontvue-plugin-stylus/branch/master/graph/badge.svg)](https://codecov.io/gh/0vidiu/frontvue-plugin-stylus) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## A Frontvue plugin for Stylus boilerplate and processing
This plugin will be one of the available options to choose from when you configure a new project using Frontvue. It handles Stylus files and comes with a boilerplate template of stylus partials. It comes with the following tasks:
* *stylus:config* — registers a configuration questionnaire;
* *stylus:template* — copies the Stylus boilerplate template (w.i.p);
* *stylus:clean* — removes the build folder;
* *stylus:process* — handles linting and compiling of Stylus partials;
* *stylus:watch* — starts listeners for changes in Stylus partials;

## Default configuration
```js
{
  // Source files directory name
  sourceDir: 'stylus',

  // Source entry point file (all other partials are imported into this main file)
  entryPoint: 'app.styl',

  // Directory name where the CSS file will be created
  buildDir: 'css',

  // Name of the compiled CSS file
  buildFilename: 'app.css',
}
```

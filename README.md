# glslang-validator-prebuilt

**[glslangValidator](https://github.com/KhronosGroup/glslang) binaries for macOS, Linux and Windows.**

This package installs the binary of `glslangValidator` to your `node_modules`.
All binaries are downloaded from https://github.com/KhronosGroup/glslang/releases.

*Note:* The version of `glslang-validator-prebuilt` follows [SemVer](http://semver.org).
When releasing new versions, **we do *not* consider breaking changes in `glslang` itself**, but only the JS interface.
To stop `glslang-validator-prebuilt` from breaking your code by getting updated, [lock the version down](https://docs.npmjs.com/files/package.json#dependencies) or use a [lockfile](https://docs.npmjs.com/files/package-lock.json).

[![build status](https://travis-ci.org/fand/glslang-validator-prebuilt.svg?branch=master)](http://travis-ci.org/fand/glslang-validator-prebuilt)

## Install

``` bash
$ npm install glslang-validator-prebuilt
```

## Usage

Returns the path of a glslangValidator binary on the local filesystem.

``` js
var validator = require('glslang-validator-prebuilt');
console.log(validator.path);
// /Users/foo/node_modules/glslang-validator-prebuilt/bin/darwin/glslangValidator
```

## Acknowledge

This project is forked from https://github.com/eugeneware/ffmpeg-static.

## LICENSE

MIT

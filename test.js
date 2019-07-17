var it = require('tape');
var fs = require('fs');
var glslangValidator = require('.');

it('should find glslangValidator.path', function(t) {
  var stats = fs.statSync(glslangValidator.path);
  t.ok(stats.isFile(glslangValidator.path));
  t.end();
});

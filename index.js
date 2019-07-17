var os = require('os');
var path = require('path');

var platform = os.platform();
if (platform !== 'linux' && platform !== 'darwin' && platform !== 'win32') {
  console.error('Unsupported platform:', platform)
  process.exit(1)
}

var arch = os.arch()
if (arch !== 'x64') {
  console.error('Unsupported architecture:', arch)
  process.exit(1)
}

var glslangValidatorPath = path.join(
  __dirname,
  'bin',
  platform,
  platform === 'win32' ? 'glslangValidator.exe' : 'glslangValidator'
)

module.exports = {
  path: glslangValidatorPath,
};

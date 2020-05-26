const fs = require("fs");
const os = require("os");
const path = require("path");
const download = require("download");
const tempDirRoot = require("temp-dir");
const extract = require("decompress");
const rimraf = require("rimraf");
const mkdirp = require('mkdirp');
const p = require("pify");

// Utility functions
const log = (str) => console.log('glslang-validator-prebuilt:', str);
const err = (str) => {
  console.error('glslang-validator-prebuilt', str);
  console.error('glslang-validator-prebuilt: Install failed.');
  process.exit(1);
}

log("Installing glslangValidator...");

const platform = os.platform();
const arch = os.arch();
if (platform !== "linux" && platform !== "darwin" && platform !== "win32") {
  err(`Unsupported platform: ${platform}`);
}
if (arch !== "x64") {
  err(`Unsupported architecture: ${arch}`);
}

const filenames = {
  darwin: "glslang-master-osx-Release",
  linux: "glslang-master-linux-Release",
  win32: "glslang-master-windows-x64-Release"
};

const filename = filenames[platform];
const suffix = platform === "win32" ? ".exe" : "";
const url = `https://github.com/KhronosGroup/glslang/releases/download/master-tot/${filename}.zip`;
const tempDir = path.resolve(tempDirRoot, "glslang-validator-prebuilt");
const zipPath = path.resolve(tempDir, `${filename}.zip`);
const unzippedBinPath = path.resolve(tempDir, `bin/glslangValidator${suffix}`);
const dstBinPath = path.resolve(__dirname, `bin/glslangValidator${suffix}`);
const dstBinDir = path.resolve(__dirname, `bin`);

const run = (promise, msg) => promise.catch(e => {
  console.error(e);
  throw new Error(msg);
});

p(rimraf)(tempDir)
  .then(() => run(mkdirp(tempDir), `Failed to create temporal directory: '${tempDir}'`))
  .then(() => run(download(url, tempDir), `Failed to download the binary to: ${tempDir}`))
  .then(() => run(extract(zipPath, tempDir), `Failed to extract zip file: '${zipPath}'`))
  .then(() => run(p(rimraf)(dstBinDir), `Failed to clean up bin directory: '${dstBinDir}'`))
  .then(() => run(mkdirp(dstBinDir), `Failed to create temporal directory: '${dstBinDir}'`))
  .then(() => run(p(fs.copyFile)(unzippedBinPath, dstBinPath), `Failed to copy binary to: '${dstBinPath}'`))
  .then(() => run(p(fs.chmod)(dstBinPath, "755"), `Failed to chmod binary: '${dstBinPath}'`))
  .then(() => {
    log("Installed glslangValidator successfully!");
  })
  .catch(e => {
    console.error(e);
    err("Failed to install glslang-validator.");
  });

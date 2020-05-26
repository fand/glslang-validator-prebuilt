const fs = require("fs");
const os = require("os");
const path = require("path");
const download = require("download");
const tempDirRoot = require("temp-dir");
const extract = require("extract-zip");
const rimraf = require("rimraf");
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

p(rimraf)(tempDir)
  .then(() => download(url, tempDir))
  .then(() => extract(zipPath, { dir: tempDir }))
  .then(() => p(rimraf)(dstBinDir))
  .then(() => p(fs.mkdir)(dstBinDir, { recursive: true }))
  .then(() => p(fs.copyFile)(unzippedBinPath, dstBinPath))
  .then(() => p(fs.chmod)(dstBinPath, "755"))
  .then(() => {
    log("Installed glslangValidator successfully!");
  })
  .catch(e => {
    console.error(e);
    err("Failed to download the binary.");
  });

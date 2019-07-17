#!/bin/sh
set +e
cd $(dirname $0)

tar_exec=$(command -v gtar)
if [ $? -ne 0 ]; then
	tar_exec=$(command -v tar)
fi

download () {
	curl -L -# -A 'https://github.com/fand/glslang-validator-prebuilt' -o $2 $1
}
set -x

echo 'windows'
download 'https://github.com/KhronosGroup/glslang/releases/download/master-tot/glslang-master-windows-x64-Release.zip' win32.zip
mkdir -p bin/win32
unzip -o -d bin/win32 -j win32.zip 'bin/glslangValidator.exe'
rm win32.zip

echo 'linux'
download 'https://github.com/KhronosGroup/glslang/releases/download/master-tot/glslang-master-linux-Release.zip' linux.zip
mkdir -p bin/linux
unzip -o -d bin/linux -j linux.zip 'bin/glslangValidator'
rm linux.zip

echo 'darwin'
download 'https://github.com/KhronosGroup/glslang/releases/download/master-tot/glslang-master-osx-Release.zip' darwin.zip
mkdir -p bin/darwin
unzip -o -d bin/darwin -j darwin.zip 'bin/glslangValidator'
rm darwin.zip

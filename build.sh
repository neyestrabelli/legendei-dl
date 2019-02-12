#!/usr/bin/env sh
rm -rf dist
mkdir dist
cp -r src/* dist/
cp package-app.json dist/package.json
cp config.sample.js dist/config.js
cd dist
npm install
npm prune
npm link

#!/bin/bash
set -xe
nohup npm start &
sleep 10
node_modules/.bin/nightwatch --env phantomjs
npm stop

#!/bin/bash
set -ex
GMAPKEY=AIzaSyDSgzVY0CYKRnx9cW0XDxDwMSAnWSumZmA nohup npm start &
sleep 5
node_modules/.bin/nightwatch --env phantomjs
npm stop

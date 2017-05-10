nohup npm start &
sleep 5
node_modules/.bin/nightwatch --env phantomjs
npm stop

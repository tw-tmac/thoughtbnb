# ThoughtBnB

[![Build Status](https://travis-ci.org/tw-tmac/thoughtbnb.svg?branch=master)](https://travis-ci.org/tw-tmac/thoughtbnb)
[![bitHound Score](https://www.bithound.io/github/asifrc/thoughtbnb/badges/score.svg)](https://www.bithound.io/github/asifrc/thoughtbnb)
[![Code Climate](https://codeclimate.com/repos/561b2ad6e30ba01a30002dd5/badges/e2f86da635d055145f9f/gpa.svg)](https://codeclimate.com/repos/561b2ad6e30ba01a30002dd5/feed)
[![Test Coverage](https://codeclimate.com/repos/561b2ad6e30ba01a30002dd5/badges/e2f86da635d055145f9f/coverage.svg)](https://codeclimate.com/repos/561b2ad6e30ba01a30002dd5/coverage)
[![Dependency Status](https://gemnasium.com/asifrc/thoughtbnb.svg)](https://gemnasium.com/asifrc/thoughtbnb)


_It's exactly what you think it is._

- [Trello Board](https://trello.com/b/zl1poSm9)
- [Snap CI Pipeline](https://snap-ci.com/asifrc/thoughtbnb/branch/master)

## Environments
- Staging: http://thoughtbnb-staging.herokuapp.com/
- Production: http://thoughtbnb.herokuapp.com/

## Getting Started
#### Using Vagrant
##### Dependencies
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- [Vagrant](https://www.vagrantup.com/)

##### Google maps javascript API
This application uses google maps javascript API to insert locations. You will need to get your own API key. Follow the following [instructions](https://developers.google.com/maps/documentation/javascript/)

##### Start application
```
vagrant plugin install vagrant-cachier
vagrant up
vagrant ssh
cd /vagrant
npm install
GMAPKEY=<keyFromInstructionAbove> EMAIL_TRANSPORT=mailcatcher npm start
```
Starts the website at http://192.168.33.15:3000

In order to reload the app on changes, use `nodemon ./bin/www` instead of `npm start`

If you're working in an area without an internet connection, use set the flag USE_LOCAL_ASSETS to true

__Note:__ bcrypt is compiled specifically for your OS during npm install, so if you run `npm install` on OS X, then it will break in Ubuntu, and vice versa. To fix, remove node_modules/bcrypt and then do `npm install` again from the OS you wish to start the app from.

#### Using Docker
##### Dependencies
- [docker](https://store.docker.com/search?offering=community&type=edition)
- [docker-compose](https://docs.docker.com/compose/install/)

Build the docker image with `./build_docker.sh`

Start the containers with `./start_app_docker.sh`

You need to manually seed the DB with the following commands:

```
docker exec -it thoughtbnb_app_1 /bin/bash
cd /opt/thoughtbnb
seed
```

#### Not Using Vagrant (Local Setup)
##### Dependencies
- node.js
- npm
- mongodb
- grunt-cli and nodemon npm packages (globally)
```
npm install -g grunt-cli nodemon
```

##### Start application
Start mongodb, then

```
npm install
npm start
```
## Test data
The database has been pre-populated. To login, use _testing@thoughtbnb.com_ and _test_ as password

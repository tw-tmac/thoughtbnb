#!/bin/bash
set -xe

echo "Packaging app..."
rm -f thoughtbnb.zip
zip -r thoughtbnb.zip bin/ models/ public/ routes/ seeds/ views/ app.js config.js package.json seed.json

echo "Building docker images"
docker-compose build

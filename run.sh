#!/bin/bash
echo 'start...'
rm -rf node_modules
npm i
npm run build
docker stop react-sail
docker rm react-sail
docker rmi react-sail:1.2
docker build -t react-sail:1.2 .
docker run --name react-sail -p 8180:80 -d react-sail:1.2
echo 'finished'
exit 0
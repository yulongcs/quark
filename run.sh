#!/bin/bash
echo 'start...'
git fetch --all  
git reset --hard origin/master
rm -rf node_modules
npm i
npm run build
docker stop react-sail
docker rm react-sail
docker rmi react-sail:1.2 # 移除1.2版本
docker rmi react-sail:1.3
docker build -t react-sail:1.3 .
docker run --name react-sail -p 8181:80 -d react-sail:1.3
echo 'finished'
exit 0
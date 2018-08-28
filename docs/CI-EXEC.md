# CI-EXEC

```bash
#!/bin/bash
echo 'start...'
rm -rf node_modules
yarn install
yarn run build
docker stop react-sail
docker rm react-sail
docker rmi react-sail:1.4
docker build -t react-sail:1.4 .
docker run --name react-sail -p 8181:80 -d react-sail:1.4
echo 'finished'
exit 0
```
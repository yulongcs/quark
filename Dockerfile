FROM nginx:1.17-alpine

LABEL vdfor <jiakun.li@qq.com>

COPY nginx.conf /etc/nginx/conf.d
COPY build/. /usr/share/nginx/html

# COPY . /usr/src/app

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

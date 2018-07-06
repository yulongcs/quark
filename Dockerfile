FROM nginx:1.15

LABEL vdfor <jiakun.li@qq.com>

COPY default.conf /etc/nginx/conf.d
COPY build/. /usr/share/nginx/html

# COPY . /usr/src/app

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

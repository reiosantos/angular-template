FROM node:12.4.0
ARG environment=docker
ENV APP_PATH=/usr/src/app NPM_CONFIG_LOGLEVEL=warn HOME=/root ENV=local

#RUN wget -O - http://nginx.org/keys/nginx_signing.key | apt-key add - && \
#echo "deb http://nginx.org/packages/debian/ stretch nginx" | tee -a /etc/apt/sources.list && \
#echo "deb-src http://nginx.org/packages/debian/ stretch nginx" | tee -a /etc/apt/sources.list && \

RUN apt-get update -y && \
apt-get upgrade -y && \
apt-get install -y nginx supervisor nano lsof nmap

#RUN echo "daemon off;" >> /etc/nginx/nginx.conf

WORKDIR $APP_PATH
COPY . $APP_PATH

RUN rm -rf node_modules

RUN npm i -g @angular/cli@8.3.23 && \
    npm i && \
    npm cache clean --force && \
    npm run build:$environment

EXPOSE 90 4200 9876

CMD ./docker/run.sh

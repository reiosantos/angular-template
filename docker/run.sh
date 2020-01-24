#!/usr/bin/env bash

echo "ENV >>>> Executing command in path ${APP_PATH}"

if [[ ${ENV} == 'local' ]]; then
    echo "ENV >>>> Docker local env"
    npm run start:docker
else
    touch /var/run/supervisor.sock
    mkdir -p /var/www/html/dashboard/
    cp -R ${APP_PATH}/dist/angular-template/* /var/www/html/dashboard/
    cp ${APP_PATH}/nginx.conf /etc/nginx/conf.d/default.conf
    cp ${APP_PATH}/supervisor.conf /etc/supervisor/conf.d/
    supervisord -n
fi

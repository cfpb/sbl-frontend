#!/bin/bash

# Use import-meta-env-alpine to inject environment variables
cd /usr/share/nginx/html
./import-meta-env-alpine -x .env.example -p html/index.html --disposable || exit 1

# Assume nginx user and start nginx
su -s /bin/ash svc_nginx_sbl && nginx -g "daemon off;"

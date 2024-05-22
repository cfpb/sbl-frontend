#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status

# Use import-meta-env-alpine to inject environment variables
cd /usr/share/nginx/html

# reset env variable injection if already performed to allow container 
# restarts with new variables
[[ -e index.html.bak ]] && cp index.html.bak index.html

# inject non-secret, public env variables into index.html
./import-meta-env-alpine -x .env.example -p index.html || exit 1

# start nginx
# su -s /bin/ash svc_nginx_sbl && nginx -g "daemon off;"
envsubst \$SBL_REGTECH_BASE_URL < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf
nginx -g "daemon off;"

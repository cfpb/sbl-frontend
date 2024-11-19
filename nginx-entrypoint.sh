#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status

# Use import-meta-env-alpine to inject environment variables
cd /usr/share/nginx/html


# inject non-secret, public env variables into index.html
./import-meta-env-alpine -x .env.example.public -p index.html --disposable || exit 1

# # create nginx.conf with env vars from template
# # must specify variables to be substituted to avoid replacing base nginx vars
envsubst \$SBL_REGTECH_BASE_URL < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf

# start nginx
nginx -g "daemon off;"

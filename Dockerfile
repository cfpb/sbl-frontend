FROM ghcr.io/cfpb/regtech/sbl/node-js-alpine:3.20 as build-stage
WORKDIR /usr/src/app
ARG DOCKER_TAG="latest"

# build import-meta-env for alpine for later env var injection
RUN npm i -D @import-meta-env/cli
RUN npm i -D @import-meta-env/unplugin

# TODO: Find a way to update the target node version for import-meta-env
# https://github.com/cfpb/sbl-frontend/issues/1061
RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js \
  -t node18-alpine-x64 \
  -o import-meta-env-alpine

COPY / /usr/src/app

RUN echo "{ \"version\": \"${DOCKER_TAG}\" }" > ./src/constants/release.json

RUN yarn install
RUN yarn build

FROM ghcr.io/cfpb/regtech/sbl/nginx-alpine:1.27
ENV NGINX_USER=svc_nginx_sbl
RUN apk update; apk upgrade
RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx

# copy the app into the nginx html folder to be served
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# copy necessary import-meta-env-alpine files for env var injection
COPY --from=build-stage \
    /usr/src/app/import-meta-env-alpine \
    /usr/src/app/nginx-entrypoint.sh \
    /usr/src/app/.env.example.public \
    /usr/share/nginx/html/

# copy nginx configuration into template folder for env var injection
COPY nginx/nginx.conf /etc/nginx/templates/nginx.conf.template
    
# Security Basline - Meets requirement 9
RUN find /etc/nginx -type d | xargs chmod 750 && \
    find /etc/nginx -type f | xargs chmod 640

# Security Basline - The `sed` was added to meet requirement 17
RUN sed -i '/Faithfully yours/d' /usr/share/nginx/html/50x.html && \
    addgroup -S $NGINX_USER && \
    adduser -S $NGINX_USER -G $NGINX_USER && \
    # We need to come back and reconcile the multiple pids.
    touch /run/nginx.pid && \
    touch /var/run/nginx.pid && \
    touch /var/run/nginx.pid && \
    chown -R $NGINX_USER:$NGINX_USER \
      /etc/nginx \
      /run/nginx.pid \
      /var/cache/nginx/ \
      /var/run/nginx.pid \
      /usr/share/nginx/html
EXPOSE 8080
USER svc_nginx_sbl

# use entrypoint to inject vars
ENTRYPOINT ["sh", "/usr/share/nginx/html/nginx-entrypoint.sh"]
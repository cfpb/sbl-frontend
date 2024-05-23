FROM node:16.20-alpine3.17 as build-stage
WORKDIR /usr/src/app
ARG DOCKER_TAG="latest"

# build import-meta-env for alpine for later env var injection
RUN npm i -D @import-meta-env/cli
RUN npm i -D @import-meta-env/unplugin
RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js \
  -t node18-alpine-x64 \
  -o import-meta-env-alpine

COPY / /usr/src/app

# TODO: CREATE RELEASE TAG -- RUN echo "{ \"version\": \"${DOCKER_TAG}\" }" > ./src/common/constants/release.json
RUN yarn install
RUN yarn build

FROM nginx:1.24-alpine
ENV ENV_USER=svc_env_sbl
ENV NGINX_USER=svc_nginx_sbl
RUN apk update; apk upgrade
RUN rm -rf /etc/nginx/conf.d
COPY nginx/useragent.rules /etc/nginx/useragent.rules

# copy nginx configuration into template folder for env var injection
COPY nginx/nginx.conf /etc/nginx/templates/nginx.conf.template
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# copy necessary import-meta-env-alpine files for env var injection
COPY --from=build-stage \
    /usr/src/app/import-meta-env-alpine \
    /usr/src/app/nginx-entrypoint.sh \
    /usr/src/app/.env.example \
    /usr/share/nginx/html/

# Security Basline - The `sed` was added to meet requirement 17
RUN sed -i '/Faithfully yours/d' /usr/share/nginx/html/50x.html && \
    adduser -S $NGINX_USER nginx && \
    addgroup -S $NGINX_USER && \
    addgroup $NGINX_USER $NGINX_USER && \
    touch /run/nginx.pid && \
    chown -R $NGINX_USER:$NGINX_USER /etc/nginx /run/nginx.pid /var/cache/nginx/
EXPOSE 8080
ENTRYPOINT ["sh","/usr/share/nginx/html/nginx-entrypoint.sh"]

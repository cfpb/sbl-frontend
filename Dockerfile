FROM ghcr.io/cfpb/regtech/sbl/nodejs-alpine:3.20 as build-stage
WORKDIR /usr/src/app
ARG DOCKER_TAG="latest"

COPY / /usr/src/app

# TODO: CREATE RELEASE TAG -- RUN echo "{ \"version\": \"${DOCKER_TAG}\" }" > ./src/common/constants/release.json
RUN yarn install
RUN yarn build

FROM ghcr.io/cfpb/regtech/sbl/nginx-alpine:1.24
ENV NGINX_USER=svc_nginx_sbl
RUN apk update; apk upgrade
RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
# Security Basline - The `sed` was added to meet requirement 17
RUN sed -i '/Faithfully yours/d' /usr/share/nginx/html/50x.html && \
    adduser -S $NGINX_USER nginx && \
    addgroup -S $NGINX_USER && \
    addgroup $NGINX_USER $NGINX_USER && \
    touch /run/nginx.pid && \
    chown -R $NGINX_USER:$NGINX_USER /etc/nginx /run/nginx.pid /var/cache/nginx/
EXPOSE 8080
USER svc_nginx_sbl
CMD ["nginx", "-g", "daemon off;"]

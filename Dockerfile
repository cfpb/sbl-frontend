#FROM node:gallium-alpine
FROM node:16.20-alpine3.17 as build-stage
ARG DOCKER_TAG="latest"

WORKDIR /usr/src/app

# install build dependencies
#COPY package*.json yarn.lock ./

RUN apk add --no-cache git
#RUN corepack enable && corepack prepare yarn@stable --activate

COPY dist ./build

#RUN yarn install

# create react app needs src and public directories
#COPY src ./src
#COPY public ./public

RUN mkdir -p ./src/common/constants/
RUN echo "{ \"version\": \"${DOCKER_TAG}\" }" > ./src/common/constants/release.json

#RUN yarn upgrade
#RUN yarn build

FROM nginx:1.24-alpine
ENV NGINX_USER=svc_nginx
RUN apk update; apk upgrade
RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
RUN adduser -S $NGINX_USER nginx && \
    addgroup -S $NGINX_USER && \
    addgroup $NGINX_USER $NGINX_USER && \
    touch /run/nginx.pid && \
    chown -R $NGINX_USER:$NGINX_USER /etc/nginx /run/nginx.pid /var/cache/nginx/
EXPOSE 5173
USER svc_nginx
CMD ["nginx", "-g", "daemon off;"]

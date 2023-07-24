FROM node:gallium-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

EXPOSE 5173

RUN corepack enable && corepack prepare yarn@stable --activate

CMD ["yarn", "docker"]

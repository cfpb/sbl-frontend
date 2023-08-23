FROM node:gallium-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN corepack enable && corepack prepare yarn@stable --activate

RUN yarn install

CMD ["yarn", "build"]

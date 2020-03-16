FROM node:13-slim

ENV WEB_PORT=3086
ENV NODE_ENV=production
ENV APP_NAME=web
WORKDIR /app

COPY package.json yarn.lock tsconfig.json webpack.config.ts /app/

RUN yarn install --production=false --ignore-scripts

COPY ./public /app/public
COPY ./src/web /app/src/web
COPY ./src/common /app/src/common

RUN yarn build
RUN yarn webpack

EXPOSE 3086

CMD ["yarn", "start:web"]
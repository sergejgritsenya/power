FROM node:13-slim

ENV ADMIN_PORT=3087
ENV NODE_ENV=production
ENV APP_NAME=admin
WORKDIR /app

COPY package.json yarn.lock tsconfig.json webpack.config.ts /app/

RUN yarn install --production=false --ignore-scripts

COPY ./public /app/public
COPY ./src/admin /app/src/admin
COPY ./src/common /app/src/common

RUN yarn build
RUN yarn webpack

EXPOSE 3087

CMD ["yarn", "start:admin"]
FROM node:13-alpine

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn
COPY . /app

ENV NODE_ENV=production

RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]

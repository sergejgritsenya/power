FROM node:13-slim

ENV NODE_ENV=production
ENV POSTGRES_URL=""
WORKDIR /app

COPY ./prisma/schema.prisma ./
COPY package.json yarn.lock /app/

RUN apt-get -qy update && apt-get -qy install openssl
RUN yarn install --production=false --ignore-scripts
RUN yarn global add prisma2@2.0.0-preview022

COPY . /app

RUN NODE_ENV=development prisma2 generate
RUN yarn build

EXPOSE 3088

CMD ["yarn", "start:api"]
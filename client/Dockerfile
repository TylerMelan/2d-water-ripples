FROM node:14-alpine

WORKDIR /client

COPY package.json yarn.lock /client/
RUN yarn install

COPY . /client

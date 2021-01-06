FROM node:14.15.4-alpine As development

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/package.json

RUN npm install --only=development

COPY . /usr/src/app

RUN npm uninstall bcrypt

RUN npm install bcrypt

EXPOSE 4001
RUN npm run start:dev



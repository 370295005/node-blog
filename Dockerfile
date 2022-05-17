FROM node:16.15.0

RUN mkdir -p /usr/src/node-blog/

WORKDIR /usr/src/node-blog/

COPY package.json /usr/src/node-blog/package.json

RUN cd /usr/src/node-blog/

RUN npm i

COPY ./dist /usr/src/nodejs/

RUN npm run build
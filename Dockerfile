FROM node:alpine

WORKDIR /home/node/app

COPY "package*.json" ./
COPY "tsconfig*.json" ./
COPY "./src/" "./src/"

RUN npm install

RUN ./node_modules/.bin/tsc


CMD [ "node", "./dist/server.js" ]

# npm install -g typescript
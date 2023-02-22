FROM ubuntu:20.04  AS system
RUN apt-get update -y
RUN apt-get upgrade -y 
RUN apt-get install curl -y 
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
###################################################
FROM system AS development
RUN npm i -g @nestjs/cli
RUN npm install pm2@latest -g
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
##################################################
FROM  system AS builder
WORKDIR /usr/src/app/backend
COPY ./backend/. .
RUN rm -rf node_modules
RUN npm ci  --save-prod 
RUN npm run build
##################################################
FROM system  as production
RUN npm install pm2@latest -g
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app/backend
RUN mkdir dist
RUN chmod 777 dist
RUN mkdir node_modules
RUN chmod 777 node_modules
COPY --from=builder /usr/src/app/backend/dist/. ./dist/.
COPY --from=builder /usr/src/app/backend/package*.json  ./
COPY --from=builder /usr/src/app/backend/node_modules/. ./node_modules/.

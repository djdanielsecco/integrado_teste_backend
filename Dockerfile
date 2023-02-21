FROM ubuntu:latest AS builder
RUN apt-get update -y
RUN apt-get upgrade -y 
RUN apt-get install curl -y 
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
RUN npm install pm2@latest -g




WORKDIR /usr/src/app/backend
COPY ./backend/. .
RUN rm -rf node_modules


RUN npm ci  --save-prod 
RUN npm run build

###########################################
FROM ubuntu:latest AS development
RUN apt-get update -y
RUN apt-get upgrade -y 
RUN apt-get install curl -y 
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
# RUN npm i -g @nestjs/cli

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}


WORKDIR /usr/src/app/backend

CMD  ls -a
##################################################
FROM ubuntu:latest as production
RUN apt-get update -y
RUN apt-get upgrade -y 
RUN apt-get install curl -y 
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
RUN npm install pm2@latest -g

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/backend
RUN mkdir dist
RUN chmod 777 dist
COPY --from=builder /usr/src/app/backend/dist/* ./dist/.

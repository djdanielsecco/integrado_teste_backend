FROM ubuntu:latest AS development
RUN apt-get update -y
RUN apt-get upgrade -y 
RUN apt-get install curl -y 
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
RUN npm i -g @nestjs/cli
# RUN npm install pm2@latest -g

# COPY package*.json ./
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}


# RUN npm install --only=development

# COPY . .
WORKDIR /usr/src/app/backend
COPY ./backend/. .
RUN rm -rf node_modules

# RUN npm install --only=production
RUN npm i 


FROM ubuntu:latest as production
RUN apt-get update -y
RUN apt-get upgrade -y 
RUN apt-get install curl -y 
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
RUN npm i -g @nestjs/cli
# RUN npm install pm2@latest -g

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/backend


COPY ./backend/. .
RUN rm -rf node_modules

# RUN npm install --only=production
RUN npm ci  --save-prod  
RUN npm run build  

# COPY . .

# ENTRYPOINT exec npm run build | npm run start:prod
# CMD ["node", "dist/main"]
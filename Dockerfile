from ubuntu:latest

#Upadte
RUN apt-get update -y
RUN apt-get upgrade -y 

RUN apt-get install curl -y 

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
RUN npm i -g @nestjs/cli
WORKDIR /app
CMD ["bin/bash"]
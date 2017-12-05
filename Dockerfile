FROM node:8
WORKDIR /home/node/app
COPY package.json /home/node/app/
# RUN npm install --registry=https://registry.npm.taobao.org

FROM node:8
RUN apt-get update \
    && apt-get install -qq libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++

WORKDIR /home/node/app
COPY package.json /home/node/app/
COPY package-lock.json /home/node/app/
RUN npm install --registry=https://registry.npm.taobao.org
COPY app.js /home/node/app/
COPY node_echarts.js /home/node/app/

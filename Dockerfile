FROM node:10.15.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY server/package*.json ./server/

WORKDIR /app/server

RUN npm install

WORKDIR /app

COPY . .

EXPOSE 3000

CMD npm start

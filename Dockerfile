ARG NODE_VERSION=20.15.0

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

COPY /package.json ./

RUN npm install

COPY . .

EXPOSE 5137

CMD ["npm", "run", "dev"]


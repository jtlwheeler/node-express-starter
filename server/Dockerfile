FROM node:10.7.0-alpine

RUN apk add --no-cache curl

WORKDIR /usr/src/app

COPY package.json .env.prod ./
COPY node_modules/ node_modules/
COPY dist/ dist/

ENV CONFIG_FILE .env.prod

CMD [ "yarn", "serve"]

EXPOSE 80

HEALTHCHECK  --start-period=5s --interval=15s CMD curl -f http://localhost:80/api/health
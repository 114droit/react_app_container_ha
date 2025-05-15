FROM node:lts-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json .

RUN npm ci --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
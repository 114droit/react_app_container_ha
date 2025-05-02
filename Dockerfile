# Stage 1: Build the React app
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve the app with nginx server
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK CMD curl -f http://localhost:80 || exit 1

# Nginx wird durch FROM nginx:alpine aufotmatisch gestartet
# Und läuft im Vordergrund, daher kein CMD-Befehl notwendig
# Stage 1: Build the React app
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

ARG VITE_API_URL

RUN npm run build

# Stage 2: Serve the app with nginx server
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

RUN echo "OK" > /usr/share/nginx/html/healthz.html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost/healthz.html || exit 1

# Nginx wird durch FROM nginx:alpine aufotmatisch gestartet
# Und läuft im Vordergrund, daher kein CMD-Befehl notwendig

#stage 1
FROM node:latest as node

WORKDIR /app

COPY dist/ ./

COPY . .

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/svc-frontend /usr/share/nginx/html

EXPOSE 8080
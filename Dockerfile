# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ARG olarak gelen parametreler her build'de değiştiği için,
# Buradan sonrası layer cache olmayacak.
ARG GIT_COMMIT
ARG BUILD_TAG

ENV GIT_COMMIT=$GIT_COMMIT
ENV BUILD_TAG=$BUILD_TAG


RUN npm run build

# Son docker image'ı bu olacak.
# Derlenmiş dosyaları serve etmek için nginx var içinde, node yok.
# Özel nginx config'i gerekiyorsa buraya yazılacak
FROM nginxinc/nginx-unprivileged:alpine
WORKDIR /usr/share/nginx/html/app
COPY nginx.conf /etc/nginx/conf.d/default.conf

USER root
RUN rm -rf ./*
USER nginx


COPY --from=builder-image /appsource/dist/demo .
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]

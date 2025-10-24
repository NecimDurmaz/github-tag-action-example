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

# ---------- Build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Daha hızlı ve deterministik kurulum için npm ci önerilir (package-lock.json varsa)
COPY package*.json ./
RUN npm ci || npm install

COPY . .

# (İsteğe bağlı) Build bilgisini içeri al
ARG GIT_COMMIT
ARG BUILD_TAG
ENV GIT_COMMIT=$GIT_COMMIT
ENV BUILD_TAG=$BUILD_TAG

# Projeni derle (çıktının /app/dist/demo olduğundan emin ol)
RUN npm run build

# ---------- Runtime stage ----------
FROM nginxinc/nginx-unprivileged:alpine

# Uygulama kökü (nginx.conf'taki root ile tutarlı olsun)
WORKDIR /usr/share/nginx/html/app

# Kendi nginx.conf'un varsa kopyala (root /usr/share/nginx/html/app ise sorun yok)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Klasörü boşalt (root yetkisi gerekir)
USER root
RUN rm -rf ./*

# Derlenen dosyaları kopyala ve sahipliğini nginx kullanıcısına ver
COPY --chown=nginx:nginx --from=builder /app/dist/demo ./

# Non-root kullanıcıya geri dön
USER nginx

EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]

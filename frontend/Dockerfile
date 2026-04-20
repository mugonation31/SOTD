# syntax=docker/dockerfile:1

# ---------- Stage 1: build ----------
FROM node:20-alpine AS build
WORKDIR /app

# Build-time secrets (anon/publishable keys ONLY - never service_role).
# Pass via `docker build --build-arg SUPABASE_URL=... --build-arg SUPABASE_ANON_KEY=...`
ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY
ARG API_URL
ARG ENCRYPTION_KEY

# replace-env.js reads these from env at build time
ENV SUPABASE_URL=$SUPABASE_URL \
    SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY \
    API_URL=$API_URL \
    ENCRYPTION_KEY=$ENCRYPTION_KEY

# Install deps (use npm ci for reproducibility)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build:prod

# ---------- Stage 2: serve ----------
FROM nginx:alpine AS serve

# Replace default config with our SPA-aware one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the build stage.
# Ionic/Angular production outputPath is `www` (see angular.json).
COPY --from=build /app/www /usr/share/nginx/html

EXPOSE 80

# nginx:alpine default CMD already runs nginx -g 'daemon off;'

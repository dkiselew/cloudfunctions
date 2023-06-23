# syntax=docker/dockerfile:1

FROM node:18-alpine

RUN apk add zip curl openssl bash --no-cache
RUN curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl" \
    && chmod +x ./kubectl \
    && mv ./kubectl /usr/local/bin/kubectl
RUN curl -Lo fission https://github.com/fission/fission/releases/download/v1.18.0/fission-v1.18.0-linux-amd64 \
    && chmod +x fission && mv fission /usr/local/bin/

WORKDIR /app

COPY . .

RUN npm ci --prefer-offline && npm run build

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV KUBECONFIG=/app/fission-k8s-kubeconfig.yaml

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]

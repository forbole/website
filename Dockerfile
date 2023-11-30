FROM node:20-alpine

ENV PORT 3000

# Set app directory
WORKDIR /app

# Installing dependencies
COPY package*.json ./
RUN npm ci

# Copying source files
COPY . .

ARG NEXT_PUBLIC_URL
ARG PORT
ARG NEXT_PUBLIC_GHOST_KEY
ARG NEXT_PUBLIC_GHOST_API
ARG NODE_ENV
ARG MAIL_GUN_USER
ARG MAIL_GUN_PW
ARG NEXT_PUBLIC_MATOMO_URL
ARG NEXT_PUBLIC_MATOMO_SITE_ID
ARG GHOST_PRIVATE_KEY
ARG NEXT_PUBLIC_GRAPHQL_API
ARG NEXT_PUBLIC_COINGECKO_API

ENV NEXT_PUBLIC_URL ${NEXT_PUBLIC_URL}
ENV PORT ${PORT}
ENV NEXT_PUBLIC_GHOST_KEY ${NEXT_PUBLIC_GHOST_KEY}
ENV NEXT_PUBLIC_GHOST_API ${NEXT_PUBLIC_GHOST_API}
ENV NODE_ENV ${NODE_ENV}
ENV MAIL_GUN_USER ${MAIL_GUN_USER}
ENV MAIL_GUN_PW ${MAIL_GUN_PW}
ENV NEXT_PUBLIC_MATOMO_URL ${NEXT_PUBLIC_MATOMO_URL}
ENV NEXT_PUBLIC_MATOMO_SITE_ID ${NEXT_PUBLIC_MATOMO_SITE_ID}
ENV GHOST_PRIVATE_KEY ${GHOST_PRIVATE_KEY}
ENV NEXT_PUBLIC_GRAPHQL_API ${NEXT_PUBLIC_GRAPHQL_API}
ENV NEXT_PUBLIC_COINGECKO_API ${NEXT_PUBLIC_COINGECKO_API}

# Building app
RUN npm run build
EXPOSE ${PORT}

CMD ["npm", "start"]

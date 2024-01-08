FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN YARN_CACHE_FOLDER=/root/.yarn yarn --immutable

ENV NEXT_TELEMETRY_DISABLED 1

COPY ./src ./src
COPY ./public ./public
COPY ./scripts ./scripts
COPY ./tsconfig.json .eslintrc.cjs .eslintignore next.config.js \
  .env next-sitemap.config.js i18n.js ./

RUN yarn analyze-bundle && mv .next/analyze public/

RUN rm -rf .next/cache

FROM node:20-alpine AS prod_node_modules
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /root/.yarn /root/.yarn
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN sed -i '/postinstall/d' package.json
RUN YARN_CACHE_FOLDER=/root/.yarn yarn --immutable && rm -rf /root/.yarn

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown nextjs .

COPY --from=prod_node_modules --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/.yarn ./.yarn
COPY --from=builder --chown=nextjs:nodejs /app/.env ./.env
COPY --from=builder --chown=nextjs:nodejs /app/i18n.js ./i18n.js
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.env ./.env

USER nextjs

CMD ["./node_modules/.bin/next", "start"]

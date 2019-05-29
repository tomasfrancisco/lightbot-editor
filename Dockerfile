FROM node:10.15-jessie as base

WORKDIR /app

ENV NODE_ENV production

COPY . .

RUN yarn install --production=false
RUN yarn build

FROM dirkdev98/docker-static

COPY --from=base /app/build /public

EXPOSE 3000

FROM node:10.15-jessie as base

WORKDIR /app

ENV NODE_ENV production

COPY . .

RUN yarn install --production=false
RUN yarn build

FROM nginx:1.15-alpine

RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx

COPY --from=base /app/build /usr/share/nginx/html

EXPOSE 80

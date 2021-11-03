FROM node:14-alpine as build

WORKDIR /app
COPY . /app/

RUN yarn install --silent && \
    yarn build

FROM nginx:1.16.0-alpine

COPY --from=build /app/public /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf  # <= This line solved my issue
COPY --from=build /app/config/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

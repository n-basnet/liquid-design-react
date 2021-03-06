# specify node version
FROM quay.io/netguru/ng-node:10 as builder

## add code & build app
COPY . $APP_HOME

RUN yarn install
RUN npm run storybook:build


## Real app image
FROM nginx:alpine as app


## Copy build/ folder to new image
COPY --from=builder /app/out /app/dist
RUN ls /app/dist
COPY nginx-staging.conf /etc/nginx/nginx.conf

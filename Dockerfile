FROM node:21-slim as build

RUN apt-get update && apt-get install -y python3
COPY . /src
WORKDIR /src
RUN npm install
RUN npm run build


FROM nginx:1

RUN apt-get update && apt-get install -y dumb-init
COPY --from=build /src/dist /usr/share/nginx/html

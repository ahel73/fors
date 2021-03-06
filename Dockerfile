FROM node:lts-alpine3.10 as build-stage
ARG registry=''
WORKDIR /app
COPY package*.json ./
RUN npm config set registry $registry
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

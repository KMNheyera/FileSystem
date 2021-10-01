FROM node:12.7-alpine AS build
WORKDIR /app
COPY package.json ./
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:1.17.1-alphine AS prod-stage
COPY --from=build /app/dist/client /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


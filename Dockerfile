# Build React app
FROM node:alpine as react-build
WORKDIR /app
COPY package-lock.json ./
COPY package.json ./
RUN npm install --silent
COPY ./public ./public
COPY ./src ./src
RUN npm run build

# Deploy React app
FROM nginx:alpine
COPY --from=react-build /app/build /usr/share/nginx/html/employees-app
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

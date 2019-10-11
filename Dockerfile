# Build React app
FROM node:alpine as react-build
COPY . .
RUN npm update
RUN npm run build

# Deploy React app
FROM nginx:alpine
COPY --from=react-build /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

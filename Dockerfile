# Build React app
FROM node:10 as react-build
COPY . .
RUN yarn
RUN yarn build

# Deploy React app
FROM nginx:alpine
COPY --from=react-build /build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
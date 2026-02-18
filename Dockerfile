FROM node:lts AS build
WORKDIR /app

COPY . .
RUN npm install && npm run build


FROM nginx:stable-alpine AS production
RUN rm /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

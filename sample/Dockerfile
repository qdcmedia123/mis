# build environment
FROM node:dubnium-alpine as build
WORKDIR /app
ENV PATH /app/client/node_modules/.bin:$PATH
COPY /client/package.json /app/client/package.json
RUN npm install --prefix ./client --silent
RUN npm install --prefix ./client react-scripts@3.0.1 -g --silent
COPY ./client /app/client
RUN npm run build  --prefix ./client




# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/client/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80




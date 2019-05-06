# Stage 1
FROM node:8 as list-build
WORKDIR /list-api

COPY package*.json   ./
RUN npm install

COPY . .

# get list server will work on 8082
EXPOSE 8082
CMD [ "npm", "start" ]

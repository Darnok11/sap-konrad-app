# Stage 1
FROM node:8 as list-build
WORKDIR /usr/src/app

COPY package*.json   ./
RUN npm install

COPY . .

# get list server will work on 3002
EXPOSE 3002
CMD [ "npm", "start" ]

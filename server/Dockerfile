# Stage 1
FROM node:8 as graphql-build
WORKDIR /usr/src/grahpql-api

COPY package*.json   ./
RUN npm install

COPY . .

# graphql server will work on it
EXPOSE 3001
CMD [ "npm", "start" ]

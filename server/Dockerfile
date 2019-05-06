# Stage 1
FROM node:8 as graphql-build
WORKDIR /grahpql-api

COPY package*.json   ./
RUN npm install

COPY . .

# graphql server will work on it
EXPOSE 8081
CMD [ "npm", "start" ]

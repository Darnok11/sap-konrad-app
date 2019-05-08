#! /bin/bash
# I didnt test this script! 
uri = "http://localhost:4000/graphql/"
movie = '{ "query": "{ movies(id: \"03de7fa801753b7adde3\") { id title } }" }'
movies = '{ "query": "{ movies(start: 2, end: 5) { id title } }" }'
list = '{ "query": "{ movies { id title } }" }'
count = '{ "query": "{ count }" }'

curl -X POST -H "Content-Type: application/json" --data $movie $uri

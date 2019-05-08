# How to use it

Before run make sure docker mongo image run on localhost http://192.168.99.100:27017.

After please run yaml file:
```
kubectl apply -f A.yaml
```
to run deployment and then create service in minikube
or run:
```
kobectl apply -f serviceA.yaml
```
to run the service directly.

The most important are application client in react-apollo as docker hub image konrazem/sap-react:0 and server in nodejs-express-graphql as docker hub image konrazem/sap-graphql:mongodocker.

You can run client server locally with commands:
```
npm start
```
or run as containers:
```
# you need docker volume (mongodata) for mongodb to have data persitante
docker pull mongo
docker volume create --name=mongodata

# build images
docker image build -t sap-list .
docker image build -t sap-graphql .
docker image build -t sap-react .

# build and start containers
docker run --name mongodb -v mongodata:/data/db -d -p 27017:27017 --network="mynet" mongo
docker run --name sap-list -p 4002:3002 --network="mynet" sap-list
docker run --name sap-react -p 80:80 --network="mynet" --rm konrazem/sap-react
```



# Task

## Goal
The main goal of this task is to create a simple application for managing movies. Application should consist of user interface and 2 micro services responsible for:

(A) Movies management service

(B) Review sanitisation service

## Technical requirements
UI written in any modern JS Framework (Angular, React, Vue.js)

### API:
* written in one of the languages: JS(NodeJS), Go, Java
* exposed as GraphQL query language or REST endpoints (with JSON data type)

* Data is persisted in database

* Test coverage for created business logic

* Whole application (front-end and APIs) should be up and running by executing single command. Use Kubernetes (can be minikube) for containers' orchestration.

## Business requirements

### API should allow:

* Creating movies (Title must have at least 3 characters up to 50 and can contain only letters)

* Getting list of movies sorted by the rating

* Deleting selected movie

* Adding a review for movie. Review should be sanitised before being published.

* 3 step sanitisation (implemented on your own or using open source libraries):

1. removing  links from external domains

2. removing offensive words. Replacing them with asterisk (****)

3. your own awesome method

* implementation should be extensible. It should be easy to include a new sanitisation step when required.

* For review sanitisation, movies service (A) calls sanitising service (B) asynchronously.

* Documentation in README.md file - please include step by step guide (How to use endpoints?) with curl examples

### Example result of GET response:

```
[
    {
        "id" : "sjgdy223",
        "title" : "MyAwesomeMovie",
        "rating" : 3.88,
        "director" : "Ken Block",
        "actors" : ["John Snow" , "Christina  Jake"],
        "createdAt" : "2016-06-07T09:53:42.523"
    }
]
```

### Output:

* Source code stored on github / bitbucket etc.

## Hints

* As a database, you can use MongoDB.

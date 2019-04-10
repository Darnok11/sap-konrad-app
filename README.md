# sap-konrad-app

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

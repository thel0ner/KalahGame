# KalahGame

## A demonstration of Kalah game - also called moncala- which plays in browser
I have implemented JWT Authentication in this project,refresh token, and pages for reports of games, abilities to create and delete games and for sure, to play.
In order to find out about KalahGame and it's rules, please have a look at it's [WikiPedia page](https://en.wikipedia.org/wiki/Kalah).
## Runing:

### back-end part:
The back end side, which is made by Spring Boot, is located in the **back-end** directory. it's a Maven project which uses MongoDB; Therefore in order to run it, please first install MongoDB if you don't have it already installed on your machine and make sure it's service is up and working; and then, please create a database called **kalahgame** and put the following object in it, which are basically roles! :

```
db.roles.insertMany([
   { name: "ROLE_USER" },
   { name: "ROLE_MODERATOR" },
   { name: "ROLE_ADMIN" },
])
```

 And then issue the following commands in your terminal right after navigating to the backend directory:

```
./mvnw spring-boot:run
```

### front-end part:
The front end side, which is made by angular and bootstrap is located inside of the **front-end** directory. in order to get it to work,once you have the [Angular-CLI](https://angular.io/cli) installed on your machine, simply, after navigating to it's directory, run following commands:

```
npm i
npm run start
```
then open your browser and navigate to [http://localhost:8081](http://localhost:8081)

## Upcoming events:
### 1) Writing tests for both back-end and front-end sections
### 2) Smoother animation in front-end section

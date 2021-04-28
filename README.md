# Smile-Squad

## Team members:

- Ayoub Kandah
- Baha Zghayar
- Raghad Mustafa
- Omar Tarawnih
- Faten Samman

## Planning

- We are going to meet everyday at 9:00 pm at Remo
- Discuss our progress, and the requriment.

## Deliverable

### Conflict Plan

- Resovling Conflict:

  - When a conflict arise we all going to meet and resolve it.

  - We all going to contribute equally, and we going to make that happen

  - We are going to discuss the functionality and check to new branch and solve it.

### Communication Plan

- We are going to communicate via Slack and Whatsapp

- We are going to make a vote on every features and functionality

- we are going to make sure everyone will speak if something happen

### Work Plan

- Using Trello and GitHub project board to assign task and everyong complete their assignment.

- Trello.

### Git Process

- Our API that will be consumed by our frontend.

- Using GitHub Orginaiztion.

- We will use the PR review:
  - Two will be reviewing the PR and confirm the merge.
  - The team leader
  - It depends on the workflow.
  - If the PR get approved we will merge it.

## Wireframe
![smile](./image/smilesquad.jpg)

### User Stories

1. Title: Playing 1 vs 1
   User story sentence: As a player I want to sign up and play vs another player the laughing game, and have the ability to add my friends.
   Feature tasks:

   1. The player can sign up.
   2. The player can play against another player.
      Acceptance Tests:
   3. Ensure the player signed up.
   4. Ensure that the player is in the database.
   5. Provide error message and abort transaction if system becomes unavailable.
      Estimated time: 1 day

2. Title: Reading jokes
   User story sentence: As a user I want to sign in and read several jokes.
   Feature tasks:

   1. The user can sign in and read jokes in the app.
      Acceptance Tests:
   1. Ensure the user have an account.
   1. Provide error message and abort transaction if system becomes unavailable.
      Estimated time: 1 day and a half

3. Title: Watching funny videos
   User story sentence: As a user I want to watch funny videos.
   Feature tasks:

   1. The user can sign in and watch funny videos.
      Acceptance Tests:
   1. Ensure the user have an account.
   1. Provide error message and abort transaction if system becomes unavailable.
      Estimated time: 1 day and a half

4. Title: Admin
   User story sentence: As an Admin I want to have the ability to write, edit, delete jokes, and have the ability to add my friends.
   Feature tasks:

   1. The admin can do several things like writing, editing, and deleting.
      Acceptance Tests:
   1. Ensure the user is an admin in the database.
   1. Provide error message and abort transaction if system becomes unavailable.
      Estimated time: 1 day

5. Title: Sign up using Facebook or Google
   User story sentence: As a user I want to sign up using Facebook or Google.
   Feature tasks:
   1. The user can have an account when he/she signed up using Facebook or Google
      Acceptance Tests:
   1. Ensure that the player is in the database when he/she signed up.
   1. Provide error message and abort transaction if system becomes unavailable.
      Estimated time: 1 day

[Project Managment Board](https://trello.com/b/2Z0xuYDT/smile-squad-code401-project)

## Domain Modeling

![Domar-modeling](./image/smile-squad-DM-1.png)

## MonogeDB

Our App mainly use the TCP connection - Socket.io, Peer.js - for send data back and forth.
We still have a simple database for storing the user data and youtube Video_id
We don't have that many relation so we decided to use mongoDB for our Webiste

![DB](./image/smile-squad-img-db.png)

- User Table

  - We store it's name, email and img url that we get from Google or Facebook or from using Basic Auth.
  - Friend List store an array of the user friends id that we can refere to at the time we need.
  - Reports have relation with Reports table for a certain user that will be provided from the other users.
  - if the admin decided that the user is should be blocked we change the user account active from true to false and will be blocked from useing the website.

- Youtube Table
  - We decided to store all the videos we get from the youtube API because we have a limit number of request per day.
  - 

## Routes Documentation 
### REST API
#### User's Routes:
1. POST `/signup` >> 
2. POST `signin` >> basic 
3. by google  `sign in by google` Open Auth

4. GET `/profile` >> bearer 
* INPUT: -
* OUTPUT: allow to show the user his account 

```Welcome to Smile Squad game <username>```

5. POST `/api/v1/players/:id/addFriend` >> bearer 
* INPUT: username
* OUTPUT: allow the user to add a specific friend 


```
{
    "active": true,
    "gamePlayed": 0,
    "gameWin": 0,
    "winRatio": 0,
      "friendList": [
        "6087273ba82a6d03a47e8db6"
    ],
    "reportsNumbers": 0,
    "reports": [],
    "role": "user",
    "_id": "6087273ba82a6d03a47e8db6",
    "username": "subhi",
    "password": "$2b$10$FJ9lEpGARlkFxbyWAyITwO.gGpvg.EaUoZ/HZQnCo4aOa1gpkxAM.",
    "email": "subhi@hotmail.com",
    "__v": 0
}
```

6. POST `/api/v1/players/:id/removeFriend` >> bearer 
* INPUT: username
* OUTPUT: allow the user to remove a specific friend 
```
{
    "active": true,
    "gamePlayed": 0,
    "gameWin": 0,
    "winRatio": 0,
    "friendList": [],
    "reportsNumbers": 0,
    "reports": [],
    "role": "user",
    "_id": "6087273ba82a6d03a47e8db6",
    "username": "subhi",
    "password": "$2b$10$FJ9lEpGARlkFxbyWAyITwO.gGpvg.EaUoZ/HZQnCo4aOa1gpkxAM.",
    "email": "subhi@hotmail.com",
    "__v": 1
}
```
7. GET `/api/v1/players/:id/friends` >> bearer 
* INPUT:
* OUTPUT: allow the user to get the names of his friends
```
[
    "subhi"
]
```

8. GET `/api/v1/search/:username` >> bearer 
* INPUT: email or username
* OUTPUT: allow the user to search on another user by email or username
```
[
    {
        "active": true,
        "gamePlayed": 0,
        "gameWin": 0,
        "winRatio": 0,
        "friendList": [],
        "reportsNumbers": 0,
        "reports": [],
        "role": "user",
        "_id": "608726f9a82a6d03a47e8db5",
        "username": "Ahmad",
        "password": "$2b$10$Mu2luCsN4p6c2f7kMyymeOYmESVIOfD8WCNLG5NNlwMqaVoXvZP.C",
        "email": "baha@hotmail.com",
        "__v": 0
    }
]
```
9. POST `/api/v1/report/player/:username` >> bearer 
* INPUT: message
* OUTPUT: allow the user to report for another user
```
{
    "active": true,
    "gamePlayed": 0,
    "gameWin": 0,
    "winRatio": 0,
    "friendList": [
        "6087273ba82a6d03a47e8db6"
    ],
    "reportsNumbers": 1,
    "reports": [
        {
            "name": "subhi",
            "msg": "this player ..................."
        },
        
    ],
    "role": "user",
    "_id": "6087273ba82a6d03a47e8db6",
    "username": "subhi",
    "password": "$2b$10$FJ9lEpGARlkFxbyWAyITwO.gGpvg.EaUoZ/HZQnCo4aOa1gpkxAM.",
    "email": "subhi@hotmail.com",
    "__v": 6
}
```
10. POST `/api/v1/players/game` 
* INPUT: 
```{ "gamePlayers":[
             "faten","raghad"
           ],
          "winner":"raghad"
         } 
 ```
* OUTPUT: count the points for the players
```
[
    {
        "active": true,
        "gamePlayed": 2,
        "gameWin": 1,
        "winRatio": 0.5,
        "friendList": [],
        "reportsNumbers": 0,
        "reports": [],
        "role": "admin",
        "_id": "60857e0e5f24870da9711bab",
        "username": "raghad",
        "email": "raghad@gmail.com",
        "password": "$2b$10$dtHeBjBMqv25kz6jiHxaUusBiKOuRqrOz1aWOoqNGJquVlSWZVa1G",
        "__v": 2,
        "posts": []
    }
]
```

11. GET `/api/v1/topPlayers` 
* INPUT: -
* OUTPUT: return the top 5 players by win ratio
```
[
    {
        "active": true,
        "gamePlayed": 10,
        "gameWin": 8,
        "winRatio": 0.80,
        "friendList": [],
        "reportsNumbers": 0,
        "reports": [],
        "role": "user",
        "_id": "6084b609fd684a11aa340196",
        "email": "youtarawneh997@gmail.com",
        "username": "omar",
        "password": "$2b$10$RUt8XNlXxMFsi4V4Xq2ns.4qndlv5puO5RlODaiHeJ03t6CaaBqcW",
        "imgurl": "empty",
        "__v": 0
    },
    {
        "active": true,
        "gamePlayed": 10,
        "gameWin": 5,
        "winRatio": 0.50,
        "friendList": [],
        "reportsNumbers": 0,
        "reports": [],
        "role": "user",
        "_id": "60853dee6d5ee304d43a22bb",
        "username": "faten1",
        "email": "faten1@gmail.com",
        "password": "$2b$10$QfYIMI567umvQ6ndAlhj8.I1mrnJvL.fWGaAUj2H4cNPMC9jCUWuC",
        "__v": 33,
        "posts": []
    },
    {
        "active": true,
        "gamePlayed": 10,
        "gameWin": 2,
        "winRatio": 0.20,
        "friendList": [
            "60853dee6d5ee304d43a22bb"
        ],
        "reportsNumbers": 0,
        "reports": [],
        "role": "admin",
        "_id": "60857dc95f24870da9711ba9",
        "username": "faten2",
        "password": "$2b$10$jKJwDKh3b8X6y0Ay0ZRDze5AD5XGcwQXTAHHlcPfJPgz2.u/VlQ5G",
        "__v": 123,
        "posts": []
    },
    {
        "active": true,
        "gamePlayed": 10,
        "gameWin": 1,
        "winRatio": 0.1,
        "friendList": [],
        "reportsNumbers": 0,
        "reports": [],
        "role": "admin",
        "_id": "60857e0e5f24870da9711bab",
        "username": "raghad",
        "email": "raghad@gmail.com",
        "password": "$2b$10$dtHeBjBMqv25kz6jiHxaUusBiKOuRqrOz1aWOoqNGJquVlSWZVa1G",
        "__v": 2,
        "posts": []
    },
    {
        "active": true,
        "gamePlayed": 0,
        "gameWin": 0,
        "winRatio": 0,
        "friendList": [],
        "reportsNumbers": 0,
        "reports": [],
        "role": "user",
        "_id": "60858d9d1bc629088193da15",
        "username": "amal",
        "email": "amal@gmail.com",
        "password": "$2b$10$n.zT6.8zcqY2T.GCrbMZi.tWHryNsEbDp/GBoJ8LD5G4jrj0PBvqa",
        "__v": 5,
        "posts": []
    }
]
```
12. POST `/api/v1/players/:id/addPost`>> bearer 
* INPUT: 
```
{
   "title":"title",
   "content":"content...."
   }
   ```
* OUTPUT:allow the user to add a specific Post

```
posts:{
[
 {
    _id:53453453454553456dcsdcsdcdsv,
    "title":"title",
    "content":"content....",
    "username":"username",
    __v: 0
   }
 ]
}
```

13. POST `/api/v1/players/:id/removePost`>> bearer 
 * INPUT: 
* OUTPUT:allow the user to remove a specific post
```
posts:[]
```

14. PUT `/api/v1/players/:id/updatePost`>> bearer 
 * INPUT: 
 ```
 {
    _id:53453453454553456dcsdcsdcdsv,
    "title":"title2",
    "content":"content2....",
    "username":"username2",
    __v: 0
   }
 
```
* OUTPUT:allow the user to update a specific post
```
posts:{
[
 {
    _id:53453453454553456dcsdcsdcdsv,
    "title":"title2",
    "content":"content2....",
    "username":"username2",
    "__v": 0
   }
 ]
}
```
15. GET `/api/v1/players/:id/posts`>> bearer 
 * INPUT: 
* OUTPUT:allow the user to get all posts
```
posts:[
{
 _id:53453453454553456dcsdcsdcdsv,
    "title": "title",
    "content": "content.....",
    "username": "username1",
    "__v": 0
},
{
 _id:53453453454553456dcsdcsdcdsv,
    "title": "title3",
    "content": "content3",
    "username": "username2",
    "__v": 0
}
```
16. GET `/api/v1/joke` 
* INPUT: -
* OUTPUT: Get random jokes from the jokes API
```
"Did you hear the one about the guy with the broken hearing aid? Neither did he."
```
17. GET `/api/v1/youtubeVideo`
* INPUT: -
* OUTPUT: Get random funny video from the youtube API
```
https://www.youtube.com/watch?v=zAe5n2F3IQI
```
### GRAPHQL API
![GRPGH](https://miro.medium.com/max/700/1*K0czTfHWTtNNBhvaVdyXfw.gif)
![GRPGH](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-api.gif)


### Testing 
![test](https://user-images.githubusercontent.com/76408716/116463887-efa1dd00-a873-11eb-9d4f-f1a3f1492465.png)


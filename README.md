# GraphQl Mongoose Jwt Typeorm Boilerplate

## Description

- Boiler plate project for
  - type-graphql(express)
  - typescript
  - typeorm
  - mongodb
  - JWT

## Features

- [x] Express Server (port 4000)
- [x] type-Graphql Entry Point (/graphql)
- [x] Graphql Playground Page (/playground)
- [x] Typeorm Settings For MongoDB
- [x] Typeorm Decorators for hasRole (@hasRole(roles: [user, superuser]))
- [x] Basic User Entity (backend/graphql/entity/Users.ts)
- [x] JasonWebToken (JWT) accessToken / refreshToken cookie for authorization.
- [x] username Sign Up
- [x] username Sign In

1. Install mongodb on your computer
2. Install `npm i typescript concurrently ts-node-dev -g`
3. Install dependencies `npm i`
4. Create `.env` file with the following variables on the project root folder:

```
SERVER_PORT=4000
ACCESS_TOKEN_SECRET=somerandomkey
REFRESH_TOKEN_SECRET=anotherrandomkey
REFRESH_TOKEN_LIFE="7 days"
ACCESS_TOKEN_LIFE="10s"
PROD_MONGO_CONNECTION=""
DEV_MONGO_CONNECTION="mongodb://localhost/graphqljwtauth"
```

5. run the project `npm start`

This project uses graphql-codegen, and if you make any changes to the .graphql files you need to generate new hooks `npm run codegen`

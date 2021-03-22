## GraphQl Mongoose Jwt Boilerplate

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

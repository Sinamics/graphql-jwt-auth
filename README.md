## GraphQl Mongoose Jwt Boilerplate

1. Install mongodb on your computer
2. Install `npm i typescript concurrently nodemon -g`
3. Create `.env` file with the following variables on the project root folder:

```
SERVER_PORT=4000
ACCESS_TOKEN_SECRET=somerandomkey
REFRESH_TOKEN_SECRET=anotherrandomkey
REFRESH_TOKEN_LIFE="7 days"
ACCESS_TOKEN_LIFE="10s"
PROD_MONGO_CONNECTION=""
DEV_MONGO_CONNECTION="mongodb://localhost/mongographjwt"
```

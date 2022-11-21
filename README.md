# Node.js express CRUD

Node.js CRUD application based on the SQLite database design and Express.js framework

This Node.js CRUD code use

- Express.js framework
- SQLite database
- sequelize ORM
- dotenv module for setting environment

## To run application

```
$ npm install

$ npm run migrate

$ npm run seed

$ npm start
```

### Database

- To migrate tables

```
npm run migrate
```

- Undo migrations

```
npm run migrate:undo:all
```

- Seed dummy data

```
npm run seed
```

- Undo seeds

```
npm run seed:undo:all
```

This app use database named `sirsaula` and `actors`, `movies` and `movieRatings` tables.

## Security

When call create/put/delete endpoints, it requires api-key

- api-key should be in header `x-access-token`
- api-key is in `.env`
- To generate new api-key, run `npm run generate:key` and it will print new key on console

## Documentation

This API documented with [Swagger](http://localhost:8080/api-docs)

<div align="center"><a href="https://graphql.org"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2048px-GraphQL_Logo.svg.png" width="150" /></a><a href="https://mongodb.com"><img src="https://cdn.iconscout.com/icon/free/png-256/mongodb-3629612-3032310.png" width="150" /></a> <a href="https://www.apollographql.com/"><img src="https://iconape.com/wp-content/files/ke/21383/svg/apollo-graphql-compact.svg" width="150" /></a>
<br /> <h1>Apollo Server MongoDB Basic Boilerplate</h1></div>

## Features 
- User can get all posts, single post, delete and update post. (CRUD)

## Getting started
- Navigate to this folder.
- Run,
```bash
yarn 
OR
npm i
```
- On config_prod.js, replace ```YOUR MONGODB URL``` with your MongoDB URL.
```bash
module.exports = {
    DATABASE_URL: "YOUR MONGODB URL"
}
``` 
- Run,
```bash
yarn start 
OR
npm start
```  

## Documentation

### Commands
```yarn start OR npm start``` start server on http://localhost:5000.

### Folder Structure
<img src="https://scontent.fkhi2-3.fna.fbcdn.net/v/t39.30808-6/243415563_1028219957927008_6047095946294879846_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeE9uYNyc8ck2JRv4AzmFGTjspPIZWn3Qymyk8hlafdDKa8CTR-OjoEFJ8q28qP0JbpbvKZAwKz1SrpJ6T1VvAXE&_nc_ohc=B8l8CnEqfLMAX82l6_J&tn=v1pjN9-LTX1T8U4J&_nc_ht=scontent.fkhi2-3.fna&oh=b866e20ed287bb2f1b3aa094ab678850&oe=61597860" />

| File name 　　　　　　　　　　　　　　| Description 　　|
| :--  | :--         |
| `└── src ` (_directory_) | _Contains the source files for your GraphQL server_ |
| `　　└── db` (_directory_) | _Contains two directories._ |
| `　　　　├── connect` (_directory_) | Contains the funtion to connect to DB. |
| `　　　　└── models` (_directory_) | Contains model from mongoose. |
| `　　└── graphql` (_directory_) | _Contains two directories._ |
| `　　　　├── resolvers` (_directory_) | Contains the implementation of the resolvers for the application schema. |
| `　　　　└── typeDefs` (_directory_) | Contains graphQL schema. |
| `　　├── config_prod.js` | Defines environment variables. (_This is a template, rename the file to config.js and paste your DB URL in it._ ) |
| `　　└── server.js` | The entry point for your GraphQL server |

### Countributing
If you found any errors or you can help creating test files for it. Then fork this repo, create a branch, commit files push it to the branch and then open a pull request. 
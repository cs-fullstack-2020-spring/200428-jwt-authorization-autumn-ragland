# 20-04-28 JSON Web Tokens Authorization

### Set Up
- Create React App called `client`
- Create directory called `server`
    - create `index.js` entry point file
    - run `npm init` to generate package.json file
    - install necessary node modules `npm install mongoose nodemon express bcryptjs jsonwebtoken` 
- In the server entry point file, define a server listening on a port and connect to mongo database
- Create a config directory with `keys.js` file, export mongo connection string (database string) and require in larger connection logic in entry point file 
- Create a routes directory with a `users.js` file with one test route
    - export mount and test in postman
- Create a models directory with `UserSchema.js` file
    - define user model with properties `name` `email` `password` and `dateCreated`

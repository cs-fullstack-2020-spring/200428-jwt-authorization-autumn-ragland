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
    - export, mount to users path, and test in postman
- Create a models directory with `UserSchema.js` file
    - define user model with properties `name` `email` `password` and `dateCreated`
    - require collection in `users.js` routes module

### Server
- Define a post endpoint to register a user at the path `/register` and send back a test message
- Define a post endpoint to login a user at the path `/login` and send back a test message
- Define a get endpoint to view a secret message at the path `/secret` and send back a test message
- Require necessary modules 
    - jsonwebtoken as `jwt`
    - bcryptjs as `bcrypt`
    - secret key from config file as `secretKey`
- Registration Route
    - call the `findOne()` method on the user collection filtering by email
    - then if a user is found send the message `a user already exists with this email`
    - if a user is not found create a `newUser` object from the UserCollection model with properties `name`, `email` and `password` pulled from the request body
    - salt and hash the `newUser` password using `bcrypt`
    - save the new user
- Login Route
    - call the `findOne()` method on the user collection filtering by email
    - then if a user is not found send the message `User with email [EMAIL] not found`
    - if a user is found check the hashed password from the database against the password passed into the request body
    - then if the passwords match define a payload object and pass it into the `jwt` `sign()` method along with the secret key defined in your keys file in your config folder, set the `expiresIn` property to 30 seconds, and a callback function with errors and token
    - in the `sign()` callback function, if there are errors send errors and if there is a token send the token
    - if the passwords do not match send the message `User with email ${email} incorrect password`
- Secret Route
    - pass the middleware function `verifyToken` as the second parameter of the route
    - define the function `verifyToken` below the route definition
        - define a variable `bearerHeader` as the `authorization` property of headers
        - if that property of headers has a value set the `req.token` as the second word in the string (the token string in the bearer token) and continue
        - if not send back the message `Forbidden` with a `403` status
    - call the `verify` method on `jwt` and pass in the `req.token`, the secret key, and a callback accepting errors and results. If errors, send them. If results, send them

### Client
- Create class based parent component `AppContainer` and route to class based components `Login`, `Register`, and `Secret` call based components
- In the `Login` component create a controlled component form that calls the post endpoint to login a user and console log the json response
- In the `Register` component create a controlled component form that calls the post endpoint to register a user and console log the json response
- In the `Secret` component  

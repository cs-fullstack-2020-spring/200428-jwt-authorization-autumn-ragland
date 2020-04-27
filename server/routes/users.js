// create express router
let express = require('express');
let router = express.Router();
// json middleware
router.use(express.json());

// create references for modules and key needed for authentication and encryption
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let secretKey = require("../config/keys").secretKey;

// mongo collection
let UserCollection = require('../models/UserSchema');

// // test route
// router.get('/test', (req, res) => {
//     res.send("TEST from user file");
// });

router.post('/register', (req, res) => {
    // res.send("Register");
    // check that email does not already exist in database
    UserCollection.findOne({ email: req.body.email })
        .then((user) => {
            // if email already exists in database
            if (user) {
                // send `already exists` message
                res.send(`User with ${req.body.email} already exists`);
            }
            // if user does not already exist in database
            else {
                // define new user from User Model
                let newUser = new UserCollection({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                // encrypt password
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        // If hash has errors send error message
                        if (error) {
                            console.log("Password has not been hashed")
                            res.status(500).send(error);
                        }
                        // if hash does not have errors
                        else {
                            // set password of new user to hashed password
                            newUser.password = hash
                            // save new user
                            newUser.save()
                                // and send new user
                                .then(user => res.json(user));
                        }
                    });
                })
            }
        });
});

router.post('/login', (req, res) => {
    res.send("Login");
});

router.post('/secret', (req, res) => {
    res.send("Secret");
});

module.exports = router;
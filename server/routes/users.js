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
                res.json({message : `User with ${req.body.email} already exists`});
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
                            res.status(500).json({error : error});
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
    // res.send("Login");
    // check that email exists in the database
    UserCollection.findOne({ email: req.body.email })
        .then(user => {
            // if email does not exist send 404 message
            if (!user) {
                res.status(500).json({message : `User with email ${req.body.email} not found`})
            }
            // if user does exist
            else {
                // compare password passed in request body with hashed password in database
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        // if passwords match
                        if (isMatch) {
                            // define payload with id and name properties from database
                            let payload = {
                                id: user._id,
                                name: user.name,
                            }
                            // create JWT using `sign()` method passing in payload
                            jwt.sign(payload, secretKey, { expiresIn: 30 }, (error, token) => {
                                // if errors send errors, otherwise send token as object
                                error ? res.status(404).json({error : error}) : res.json({ token: `Bearer ${token}` });
                            });
                        }
                        // if passwords don't match send 404 message
                        else {
                            res.status(404).json({message : `User with email ${req.body.password} incorrect password`});
                        }
                    });
            }
        });
});

router.post('/secret', verifyToken, (req, res) => {
    res.send("Secret");
});
function verifyToken(req,res,next){
    console.log("verify token");
    next();
}

module.exports = router;
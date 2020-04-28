// create express router
let express = require('express');
let router = express.Router();
// json middleware
router.use(express.json());

// json web token module
let jwt = require('jsonwebtoken');
// encryption module
let bcrypt = require('bcryptjs');
// secret from keys file
let secretKey = require('../config/keys').secretKey

// mongo collection
let UserCollection = require('../models/UserSchema');

// // test route
// router.get('/test', (req, res) => {
//     res.send("TEST from user file");
// });

// post endpoint to login a user
router.post('/login', (req,res) => {
    // res.send("Post Login");
    UserCollection.findOne({email : req.body.email})
        .then((user) => {
            if(!user){
                res.status(404).json({error : `User with email ${req.body.email} does not exists`});
            } else {
                // res.send("User found");
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if(isMatch) {
                            // res.send("passwords matched");
                            let payload = {
                                id : user._id,
                                name : user.name,
                            }
                            jwt.sign(payload, secretKey, {expiresIn : 120}, (error, token) => {
                                error ? res.status(404).json({error : error}) : res.json({token : `Bearer ${token}`});
                            });
                        } else {
                            res.status(404).json({error : `User with email ${req.body.email} incorrect password`})
                        }
                    });
            }
        });
});

// post endpoint to create a new user
router.post('/register', (req,res) => {
    // res.send("Post Register");
    UserCollection.findOne({email : req.body.email})
        .then((user) => {
            if(user){   
                res.status(403).json({error : `User with email ${req.body.email} already exists`})
            } else {
                // res.send("user not found");
                let newUser = new UserCollection({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                });
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if(error) {
                            console.log("password not hashed")
                        } else {
                            newUser.password = hash
                            newUser.save()
                                .then(user => res.json(user))
                        }
                    })
                })
            }
        })

});

// post endpoint protected route
router.post('/secret', verifyToken, (req,res) => {
    // res.send("Post Secret");
    jwt.verify(req.token, secretKey, (error, results) => {
        error ? res.status(500).json({error : error}) : res.json({message : results});
    })
});

// verify that bearer token exists and pull out encrypted token only
function verifyToken (req, res, next) {
    // console.log("verify token");
    let bearerHeader = req.headers["authorization"]; // pull token from header
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let bearerToken = bearer[1]; // encrypted token only
        // console.log(bearerToken);
        req.token = bearerToken
        next();
    } else {
        res.status(403).json({error : "Forbidden Route"});
    }

}

module.exports = router;
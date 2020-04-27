// create express router
let express = require('express');
let router = express.Router();
// json middleware
router.use(express.json());

// mongo collection
let UserCollection = require('../models/UserSchema');

// test route
router.get('/test', (req, res) => {
    res.send("TEST from user file");
});

module.exports = router;
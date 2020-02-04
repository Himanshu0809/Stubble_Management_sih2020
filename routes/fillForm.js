var express = require("express");
var router = express.Router();
var Status = require("../models/status");

router.post("/", function (req, res) {
    
 var newStatus = new Status(
    {
        name: req.body.name,
        crop: req.body.crop,
        email: req.body.email,
        capacity: req.body.capacity,
        status: 0
    }
);

newStatus.save().then(() => res.redirect('/status'));

});


module.exports = router;
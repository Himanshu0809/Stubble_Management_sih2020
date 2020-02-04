var express = require("express");
var router = express.Router();
var Status = require("../models/status");
let mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

router.get("/", function (req, res) {
    if(req.user) {
        res.render("status");
    }
    else {
        res.redirect('/')
    }
 
});

router.get("/getStatus", function (req, res) {
    
    Status.findOne({ name: req.user.username }, function (err, user) {
     res.send({status : user.status})

    });
    });


router.post("/getStatus", function (req, res) {
    
    // Set status = 1 after delivery
    let change =  Status.findOneAndUpdate({name : req.user.username}, {status : 1}, () => {
        res.send({success : true})
    });
    });
    

module.exports = router;
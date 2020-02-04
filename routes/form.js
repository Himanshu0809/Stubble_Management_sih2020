var express = require("express");
var router = express.Router();
var j2JsonData = require('../j2.json.js');
var j1JsonData = require('../j1.json.js');


router.get("/", function (req, res) {
    if(req.user) {
        
        res.render("form");
    }
    else {
        res.redirect('/')
    }
    
});


router.get("/getWarehouseName", function (req, res) {
res.send({"warehouse" :j2JsonData.X.warehouses.toString(),
           "crop" : j1JsonData.X.crop,
           "quantity" : j1JsonData.X.quantity
       })
});




module.exports = router;
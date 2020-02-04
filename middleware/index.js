var Comment=require("../models/comments");
var Book=require("../models/books");
var Review=require("../models/review");

//all middlewares go here

var middlewareObj={};

middlewareObj.isLoggedIn=function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldUrl=req.url; 
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
}

module.exports=middlewareObj;
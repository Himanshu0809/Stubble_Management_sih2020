var express = require("express");
var router = express.Router();
var async       = require('async');
var crypto       = require('crypto');
var passport = require("passport");
var flash  = require("connect-flash");
var nodemailer = require("nodemailer");
var sgMail  = require('@sendgrid/mail');
var User = require("../models/user");

sgMail.setApiKey(process.env.SENDGRID_API); 

//root route
router.get("/", function (req, res) {
    res.render("landing");
});

//show register form
router.get("/register", function (req, res) {
    res.render("login");
})

//handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User(
        {
            username: req.body.username,
            email: req.body.email,
        }
    );
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
			console.log(err);
            return res.render("register", { error: err.message });
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to Stubble optimiser " + user.username);
            res.redirect("/form");
        });
    });
});

//show login form
router.get("/login", function (req, res) {
    res.render("login");
})

//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/form",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: 'Welcome to Stubble optimiser!'
}), function (req, res) {

});

//logout route
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});


router.get("/notifier", function(req, res){

	// console.log(req.query.body);
	// var farmer = req.query.body;
    // console.log(farmer);
    
	// if(farmer){

		const msgToWarehouse = {
			to: 	 'guptahimanshu479@gmail.com',
			from: 	 'distroters1@gmail.com',
			subject: 'mail from ____',
            text: 	 '______',
            html: 	 '<h1>Stubble Info.... ' +
					 '<br>' +
					 '<h2>Farmer Details</h2>' +
					 '<br>' +
					 '<b>Customer Email: Mail received' +
					 '<br>' +
					 '<b>Customer Email: guptahimanshu479@gmail.com'
		};
		const msgToFarmer = {
			to: 	 'guptahimanshu479@gmail.com',
			from: 	 'distroters1@gmail.com',
			subject: 'Stubble reported!',
            text: 	 '_______',
            html: 	 'Mail to warehouse sent'
			
		};

		sgMail.send(msgToWarehouse, (error, result) =>{
			if (error) {
				console.log(error);
				req.flash("error", "Email not sent!" ); 
				res.redirect("back");
			}
			else {
				sgMail.send(msgToFarmer, (error) =>{
					if (error) {
						console.log(error);
						req.flash("error", "Email not sent!" );                
						res.redirect("back");
					}
					else {
						req.flash("success", "Email Sent!" );    
						return res.redirect('/status');
					};	
				});
			}
		});		
	// }else{
		// res.render('notifier.ejs');
	// }
});

module.exports = router;


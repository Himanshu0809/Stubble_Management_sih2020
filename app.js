require("dotenv").config()

//requiring npm packages
var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    flash                   = require("connect-flash"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    methodOverride          = require("method-override"),
    session                 = require("express-session"),
    path                    = require("path"),
    nodemailer              = require("nodemailer");

//requiring models
var User = require("./models/user");

//requiring routes
var indexRoutes = require("./routes/index"),
    userRoutes = require("./routes/user");

//Database connectivity
mongoose.connect("mongodb+srv://stubble:sih123@cluster0-bfs8g.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log(`Database connected`))
    .catch(err => console.log(`Database connection error: ${err.message}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(flash());


//Make the images directory in the public directory static
app.use('/public/images/', express.static('./public/images'));

//Make the javascripts directory in the public directory static
app.use('/public/javascripts/', express.static('./public/javascripts'));
app.use('/public/javascripts/', express.static('./public/stylesheets'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
app.use(flash());


//PASSPORT CONFIGURATION
app.use(session({
    secret: "This is the Sih secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // User.authenticate comes in with the passportlocalMongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//including res.locals
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//using routes
app.use("/", indexRoutes);
app.use("/", userRoutes);


//connecting to localhost
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`SIH started on port ${PORT}`);
});


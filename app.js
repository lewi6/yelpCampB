var express=require("express");
var app           = express();
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    flash         = require("connect-flash"),
    seedDB        = require("./seed"),
    Campground    = require("./views/models/campground"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./views/models/user"),
    Comment       = require("./views/models/comment");
    methodOverride = require("method-override"),
    commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"), 
    indexRoutes      = require("./routes/index");
 
// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3");

// mongoose.connect({useNewUrlParser : true,useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Pics"));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());
// Passport Configuration
app.use(require("express-session")({
  secret: "Rusty is the best",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

app.set("view engine","ejs");
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comment",commentRoutes);


app.listen(1234,function() {
    console.log("Server Listening 1234");
})
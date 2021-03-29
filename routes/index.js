var express = require("express")
var router  = express.Router();


router.get("/",function(req, res){
  res.render("landing");
})


router.get("/register", (req, res) => {
  res.render("register")
})

router.post("/register", (req, res) => {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password,(err, user) => {
    if(err){
      console.log(err);
      req.flash("error",err.message);   
      return res.redirect('register');
    }
    passport.authenticate("local")(req, res,() => {
      req.flash("success","Thanks "+ newUser.username +" for registering !")
      res.redirect("/campgrounds");
    })
  })
})

router.get("/login", (req, res) => {
  res.render("login");  
})

router.post("/login",passport.authenticate("local",{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
  }),(req, res) => {
})

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success","Successefully logged out")
  res.redirect("/campgrounds");
})

module.exports = router;

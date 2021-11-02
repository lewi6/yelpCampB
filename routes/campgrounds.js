var express = require("express")
var router  = express.Router();
var passport= require("passport");
var Campground    = require("../views/models/campground");
var middleware = require("../middleware");

router.get("/",function(req,res){
  Campground.find({},(err, allCampgrounds)=>{
    if(err){
      console.log(err);
    } else{
      res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});  
    }
  });
});

router.post("/",middleware.isLoggedIn, (req,res) => {
  var name=req.body.name;
  var image="/" + req.body.image;
  var description= req.body.description;
  var author= {
    id : req.user._id,
    username: req.user.username
  }
  var newCampground = {name:name,image:image,description:description, author:author}
  Campground.create(newCampground, (err, cmp) => {
    if(err){
      console.log(err);
    } else {
      req.flash("success", "New Campground Created !");
      res.redirect("/campgrounds");
      console.log("created by "+ req.user.username)
    }
  }); 
});

router.get("/new",middleware.isLoggedIn,function(req,res){
  res.render("campgrounds/new.ejs");
})

router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec((err,fndcmp) => {
    if(err){
      console.log(err);
    } else {
      // console.log(fndcmp);
      res.render("campgrounds/show",{campgrounds:fndcmp});
    }
  });
});

router.get("/:id/edit",middleware.checkCmpOwnership,(req, res) => {
  Campground.findById(req.params.id, (err, fndcmp) => {
    if(fndcmp.author.id.equals(req.user._id)){
      res.render("campgrounds/edit", {campground:fndcmp});
    } 
  })
});



router.put("/:id", (req, res) => {
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err , updateCamp) => {
    if(err){
      res.redirect("/campgrounds");
    } else {
      req.flash("success","Successfully updated campground")
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

router.delete("/:id", middleware.checkCmpOwnership, (req, res) => {
  Campground.findByIdAndDelete(req.params.id, (err) => {
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  })
})





module.exports = router;
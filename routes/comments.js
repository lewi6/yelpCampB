var express = require("express")
var router  = express.Router({mergeParams:true});
var Campground    = require("../views/models/campground");
var Comment       = require("../views/models/comment");
var middleware = require("../middleware");


router.get("/new",middleware.isLoggedIn,function(req, res){
  Campground.findById(req.params.id,(err, fndcmp) => {
    if(err){
      console.log(err);
    } else {
      res.render("comments/new",{campgrounds:fndcmp});
    }
  })
})

router.post("/", (req, res) => {
  Campground.findById(req.params.id,(err, camp) => {
    if(err){
      console.log(err);
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err){
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          camp.comments.push(comment);
          camp.save();
          req.flash("success","Thanks for your comment ")
          res.redirect("/campgrounds/"+ camp._id);
        }  
      })
    }
  })
})

router.get("/:comment_id/edit",middleware.checkCmTownership,(req, res) => {
  Comment.findById(req.params.comment_id, (err , fndcmt) => {
    if(err){
      res.redirect("back")
    } else {
      req.flash("error","You need to be logged in!")
      res.render("comments/edit",{campgrounds_id : req.params.id,comment:fndcmt});
    } 
  })
})

router.put("/:comment_id",(req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment ,(err, fndcmt) => {
    if(err){
      res.redirect("back")
    } else {
      req.flash("success","Thanks for your comment ")
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

router.delete("/:comment_id", middleware.checkCmTownership ,(req, res) => {
  Comment.findByIdAndDelete(req.params.comment_id,(err) => {
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id); 
    }
  })
})





module.exports = router;

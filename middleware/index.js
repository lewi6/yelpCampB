// all the middleware goes here

const { model } = require("mongoose");

var middlewareObj = {};

middlewareObj.checkCmpOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, (err, fndcmp) => {
      if(err){
        res.redirect("back");
      } else {
        if(fndcmp.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back")
        }  
      } 
    });
  } else {
    res.redirect("back");
  }
}
middlewareObj.checkCmTownership = function(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, (err, fndcmt) => {
      if(err){
        res.redirect("back");
      } else {
        if(fndcmt.author.id.equals(req.user._id)){
          next();
        } else {
          res.send("Not AUTHORISED")
        }
      } 
    });
  } else {
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login")
}



module.exports = middlewareObj;
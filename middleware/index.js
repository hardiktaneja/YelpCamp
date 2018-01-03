var middlewareObj ={};
var Camps = require("../models/campground");
var Comment =require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req,res,next){
     if(req.isAuthenticated()){
      
      Camps.findById(req.params.id,function(err,foundCampground){
            
      if(err || !foundCampground){
              req.flash("error","Campground not found.");
         res.redirect("back");
      }
      
      else{
         if(foundCampground.author.id.equals(req.user._id)){
      next(); 
         }
         
         else{
         req.flash("error","You don't have permission to do that.")

            res.redirect("back");
         }
         
      }
   })
   
         }
   
   else{
      res.redirect("back");
      
   }
};

middlewareObj.checkCommentOwnership = function(req,res,next){
  if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id, function(err, foundComment){
           if(err || !foundComment){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error","You don't have permision to do that.")
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error","You need to be Logged In to do that..")
        res.redirect("back");
    }  
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be Logged In to do that..")
    res.redirect("/login");
};

module.exports = middlewareObj;
var express = require("express");
var router = express.Router();
var Camps = require("../models/campground.js"),
    Comment=require("../models/comment.js"),
    middleware =require("../middleware");
    
    
// ===========
//Comments routes
//============

router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req, res) {
   // res.send("You hit the new comments route") ;
   var id = req.params.id;
   Camps.findById(id,function(err,foundCampground){
      if(err)
         console.log(err);
         else{
      res.render("comments/new.ejs",{campground:foundCampground});
         }
   });
   
});


router.post("/campgrounds/:id/comments",function(req,res){
   //lookup campground using id
   Camps.findById(req.params.id,function(err, foundCampground) {
      if(err)
         console.log(err);
         
      else{
         Comment.create(req.body.comment,function(err,comment){
            if(err)
               console.log(err);
            else{
               //Add Username and Id to comment
               comment.author.username = req.user.username;
               comment.author.id = req.user._id;
               //Save comment
               comment.save();
               foundCampground.comments.push(comment);
               foundCampground.save();
               req.flash("success","Comment added .")
               res.redirect("/campgrounds/"+foundCampground._id);
               
               console.log(comment);
            }
         });
      }
   });
   
   //create a new commnt
   //link commen to the post
   //redirect to the show pge
   
});


router.get("/campgrounds/:id/comments/:comments_id/edit",middleware.checkCommentOwnership,function(req,res){
   
  Comment.findById(req.params.comments_id,function(err, foundComment) {
      if(err){
         console.log(err)
      }
      
      else{
           res.render("comments/edit.ejs",{campground:req.params.id,comment:foundComment});
      }
  })
}) ; 

//COMMENT UPDATE ROUTES
router.put("/campgrounds/:id/comments/:comments_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comments_id,req.body.comment,function(err,updatedComment){
      if(err){
         console.log("err")
      }
      
      else{
         res.redirect("/campgrounds/"+req.params.id);
      }
   });
});


//Delete Route
router.delete("/campgrounds/:id/comments/:comments_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndRemove(req.params.comments_id,function(err){
      if(err)
         console.log(err);
      
      else{
             req.flash("success","COmment deleted.")

         console.log("Comment deleted")
         res.redirect("/campgrounds/"+req.params.id);
      }
   })
});


// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//        return next();
//     }
//     res.redirect("/login");
// }

// function checkCommentOwnership(req,res,next) {
//     if(req.isAuthenticated()){
      
//       Camps.findById(req.params.id,function(err,foundComment){
            
//       if(err){
//          res.redirect("back");
//       }
      
//       else{
//          if(foundComment.author.id.equals(req.user._id)){
//       next(); 
//          }
         
//          else{
//             res.redirect("back");
//          }
         
//       }
//    })
   
//          }
   
//    else{
//       res.redirect("back");
      
//    }
 
// }

// function checkCommentOwnership(req, res, next) {
//  if(req.isAuthenticated()){
//        Comment.findById(req.params.comments_id, function(err, foundComment){
//           if(err){
//                res.redirect("back");
//           }  else {
//                // does user own the comment?
//             if(foundComment.author.id.equals(req.user._id)) {
//                 next();
//             } else {
//                 res.redirect("back");
//             }
//           }
//        });
//     } else {
//        res.redirect("back");
//     }
// }

module.exports= router;
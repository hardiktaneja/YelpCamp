var express = require("express");
var router = express.Router();
var User=require("../models/user"),
    passport =require("passport");

router.get("/",function(req,res){
   res.render("home.ejs") ;
});


//AUTH Routes 

router.get("/register",function(req, res) {
    res.render("register.ejs");
});

router.post("/register",function(req, res) {
   User.register(new User({username:req.body.username}),req.body.password,function(err,user){
      if(err){
         req.flash("error",err.message);
         return res.render("/register");
      }
      
      else{
         passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome to YelpCamp " +user.username);

            res.redirect("/campgrounds");
         });
      }
   });
});

router.get("/login",function(req,res){
   res.render("login.ejs",{currentUser:req.user});
});

router.post("/login",passport.authenticate("local",{
   successRedirect:"/campgrounds",failureRedirect:"/login"
}) ,function(req, res) {
}) ;  


router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","Logged you out.")
   res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports =router;
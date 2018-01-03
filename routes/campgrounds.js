var express = require("express");
var router = express.Router();
var middleware = require("../middleware");

var Camps = require("../models/campground.js");

//INDEX -- Show all campgrounds
router.get("/campgrounds",function(req,res){
  
Camps.find({},function(err,allcamps){
      if(err){
         console.log(err);
      }
      else{
         res.render("campgrounds/index.ejs",{campgrounds:allcamps,currentUser:req.user});
      }
   });
   
   
});

//CREATE -- Add new campgrounds
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
   // res.send("You hit a post request");

   var name1= req.body.name;
   var image1= req.body.image;
   var description1 = req.body.description;
   var price1 = req.body.price;
   var author = {
      id:req.user._id,
      username:req.user.username
   };
   var newCampground = {name : name1, image:image1,description:description1,author:author,price:price1};
   
   
   Camps.create(newCampground,function(err,newcamp){
      if(err){
         console.log("ERRRRR");
      }
      else{
         console.log("SUCCESS");
         console.log(newcamp);
       res.redirect("/campgrounds");
         
      }
   });
   // campgrounds.push(newCampground);
   // res.redirect("/campgrounds");
   
   
});


//NEW -- show form tp create a new campground
router.get("/campgrounds/new",middleware.isLoggedIn,function(req, res) {
   res.render("campgrounds/new.ejs") ;
});


router.get("/campgrounds/:id",function(req,res) {
   //Find campground by given id
   // req.params.id to find id is used here
   Camps.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
      if(err)
         {console.log(err);}
         
          // Show more imformation about a campground
         else{
            res.render("campgrounds/show.ejs",{camp: foundCampground});
         }
         
   });
   
});







//if user is logged in
   //does his id match author's id??
   //render the edit page
   
   //res.send("you dont have permission bitch")
   
//if user is not logged in ==> redirect him to the login form






//EDIT-Link to form for editing campground
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req, res){
   
   Camps.findById(req.params.id,function(err,foundCampground){
      if(err){
         console.log("error");
      }
      
      else{
         res.render("campgrounds/edit.ejs",{campground: foundCampground});
      }
   });
});


//UPDATE-PUT request to where edit form submits to
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
   //find and update
   var name=req.body.name;
   var image=req.body.image;
   var description=req.body.description;
   var price = req.body.price;
   var Snapcampground={
      name,image,description,price
   }
   
   Camps.findByIdAndUpdate(req.params.id,Snapcampground,function(err,updatedCampground){
      if(err)
      console.log("err")
      
      else{
         res.redirect("/campgrounds/"+ req.params.id);
      }
   })
});


//DELETE ROUTE 
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req, res) {
    Camps.findByIdAndRemove(req.params.id,function(err){
       if(err)
       console.log(err);
       
       else{
          console.log("Camp DEleted");
          res.redirect("/campgrounds");
       }
    });
});



// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//        return next();
//     }
//     res.redirect("/login");
// }


// function checkCampgroundOwnership(req,res,next) {
//     if(req.isAuthenticated()){
      
//       Camps.findById(req.params.id,function(err,foundCampground){
            
//       if(err){
//          res.redirect("back");
//       }
      
//       else{
//          if(foundCampground.author.id.equals(req.user._id)){
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

module.exports = router;
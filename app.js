var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    Camps = require("./models/campground"),
    methodOverride=require("method-override"),
    seedDB = require("./seeds.js"),
    Comment=require("./models/comment.js"),
    passport = require("passport"),
    LocalStrategy=require("passport-local"),
    User=require("./models/user"),
    flash = require("connect-flash");
    
var commentRoutes = require("./routes/comments.js"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    indexRoutes = require("./routes/index.js");
    
    
//SEED THE DATABASE
// seedDB();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});


app.use(flash());




// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//schema

app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});


// //creating a campground
// Camps.create(
//  { name: "Mountain Goat's Rest", 
//    image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",
//    description:"This is a huge campground,Mountain Goat's Rest"},
//    function(err,camp){
//       if(err){
//          console.log("ERRRRRR");
//       }
      
//       else{
//          console.log("Campground ADDED");
//          console.log(camp);
//       }
//    }
// );

//  var campgrounds = [
//        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
           
//        ]

app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));




app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("YelpCamp has started!") ;
});
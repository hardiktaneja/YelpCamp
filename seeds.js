var mongoose = require("mongoose");
var Camps = require("./models/campground");
var Comment = require("./models/comment");

var Data =[
    {
        name:"Mountain Goat's Rest",
        image:"https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg",
        description:"Signora, between Austria and Italy, there is a section of the Alps called TheSemmering. It is an impossibly steep, very high part of the mountains.They built a train track over these Alps to connect Vienna and Venice. They built these tracks even before there was a train in existence that could make the trip."
    },
    
        {
        name:"Hill Side View",
        image:"https://farm5.staticflickr.com/4424/37433523451_182d529034.jpg",
        description:"Signora, between Austria and Italy, there is a section of the Alps called TheSemmering. It is an impossibly steep, very high part of the mountains.They built a train track over these Alps to connect Vienna and Venice. They built these tracks even before there was a train in existence that could make the trip."
    },
    
        {
        name:"Naini Retreat",
        image:"https://farm9.staticflickr.com/8577/16263386718_c019b13f77.jpg",
        description:"Signora, between Austria and Italy, there is a section of the Alps called TheSemmering. It is an impossibly steep, very high part of the mountains.They built a train track over these Alps to connect Vienna and Venice. They built these tracks even before there was a train in existence that could make the trip."
    }
    
    ]

function seedDB(){
    Camps.remove({},function(err){
    //   if(err)
    //   console.log(err);
       
    //   else{
    //   console.log("Campgrounds deleted");
    //       //Add a few campgrounds
    //         Data.forEach(function(camp){
    //           Camps.create(camp,function(err,data){
    //               if(err)
    //                 console.log(err);
                    
    //                 else
    //                  console.log(data);
    //                  //Adding a comment
    //                  Comment.create({
    //                     text:"Great camp but no internet",
    //                     author:"Homer"
    //                  },function(err,comment){
    //                      if(err)
    //                         console.log(err);
                            
    //                     else{
    //                         data.comments.push(comment);
    //                         data.save();
    //                         console.log("Created new comment")
    //                     }
    //                  });
    //           }) ;
    //         });
    //     }
       
    });
    
};

module.exports= seedDB;
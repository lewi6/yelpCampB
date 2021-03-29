var mongoose = require("mongoose");
const Comment = require("./views/models/comment");
const Campground = require("./views/models/campground");

var data = [
  
  {name:"Rubavu",
  image:"/a.jpg",
  description:"Load balancing is to efficiently distribute incoming network traffic across a group of servers. Clustering is using multiple servers as if they were a single entity.A cluster is a group of multiple server instances, spanning across more than one node, all using identical configuration. "
},

  {name:"Heha",
  image:"/b.jpg",
  description:"Load balancing is to efficiently distribute incoming network traffic across a group of servers. Clustering is using multiple servers as if they were a single entity.A cluster is a group of multiple server instances, spanning across more than one node, all using identical configuration. "
},

  {name:"Boteng",
  image:"/c.jpg",
  description:"Load balancing is to efficiently distribute incoming network traffic across a group of servers. Clustering is using multiple servers as if they were a single entity.A cluster is a group of multiple server instances, spanning across more than one node, all using identical configuration. "
},
]

var seedDB = () =>{
  Campground.remove({},(err) => {
  if (err){
  console.log(err);
  } 
  console.log("removed campgrounds!");

  data.forEach((seed) => {
    Campground.create(seed,(err, campground )=>{
     if(err){
     console.log(err);
     } else {
       console.log("campground added");
       Comment.create(
         {
         text:"Barca the bes team",
         author:"Homer"
       }, (err,comment) => {
         if(err){
           console.log(err)
         } else {
          campground.comments.push(comment);
          campground.save();
          console.log("Created comment")
         }
       }
       );
     }
    });
  });
  
 });

 
}

 module.exports= seedDB;
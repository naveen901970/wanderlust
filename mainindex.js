///------------------------============NMP PACKAGES=======--------------------------------
const express=require("express");
const app=express();
const path= require("path")
const port=9008;
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const ejsMeta = require('ejs-mate');

//--------------------------------------------------------------------------------
// ======RERUIRED FROM OTHER FILES=====
app.use(methodOverride('_method'))
const lists=require("./model/schema");
const wrapasycn=require("./utils/wrapasync");
const Expresserror=require("./utils/expresserrors")
const {listingschem}=require("./schema.js");
const review=require("./model/review.js");

// ------------------------------------------------------------------------------------
//=====PATH AND CONNECTION SETUP====
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))
app.use(express.urlencoded({extended:true}));
app.engine('ejs', ejsMeta);
app.use(express.static(path.join(__dirname,"public")))

main().then((res)=>{
    console.log("connection is sucsses")
}).catch((err)=>{
    console.log(err)
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbin');
 
}
//==========================================================================================

const validatelisting=(req,res,next)=>{
    let {error}=listingschem.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new Expresserror(400,errmsg);
    }else{
        next()
    }
}
// -----------------------------------------------------------------------------------------------
// let result=listingschem.validate(req.body);
// if(result.error){
//  throw new Expresserror(401,result.error);
// }
// console.log(result);
//main route
app.get("/listings",  wrapasycn(async(req,res)=>{
    let newlist= await lists.find();
    res.render("./listing/index.ejs",{newlist})
}));
//create route
app.get("/listings/new", (req,res)=>{
    console.log("this is working");
    res.render("./listing/create.ejs")
});


//read  show route in deatail
app.get("/listings/:id", wrapasycn(async(req,res)=>{
    
    let {id}=req.params;
    let newlist1= await lists.findById(id)
    res.render("./listing/show.ejs",{newlist1})
}));


app.post("/listings", wrapasycn(async(req,res,next)=>{
     if(!req.body.listing){
        throw new Expresserror(400,"send  a valid data  for listing")
     }
    let newlisting= new lists(req.body.listing);
       await newlisting.save();
    
       res.redirect("/listings")
      

 }));





 //editing route
 app.get("/listings/:id/edit", wrapasycn(async (req,res)=>{
    let {id}=req.params;
    let newlist1= await lists.findById(id)
    res.render("./listing/edit.ejs",{newlist1})
 }))
 
 app.put("/listing/:id/",validatelisting, wrapasycn(async(req,res)=>{
  
    let {id}=req.params;
    await lists.findByIdAndUpdate(id,{...req.body.listing});

    res.redirect("/listings")
 }));

 //detele route
 
 app.delete("/listings/:id", wrapasycn(async(req,res)=>{
    let {id}=req.params;
    await lists.findByIdAndDelete(id);
     res.redirect("/listings");
 }));


 
//  app.use((err,req,res,next)=>{
//    let {StatusCode,message}=err
//    res.status(StatusCode) .render("listing/error.ejs",{message})
// //    res.status(statusCode).send(message);
//  })

 
// ================================================================
//======= REVIEWS======

app.post("/listings/:id/review",async(req,res)=>{
    let listing=await lists.findById(req.params.id);
    let newreview=new review(req.body.review);


    await listing.reviews.push(newreview);

    await newreview.save();
    await listing.save();

     res.send("i'ts working")

    })
















//===========================================================================================
//--------------------============EORROR HANDELER============-------------------------------
app.all("*",(req,res,next)=>{
    next(new Expresserror (401,"page was not found"))
})


app.use((err,req,res,next)=>{
    let {StatusCode=500,message="some error"}=err
    res.status(StatusCode) .render("listing/error.ejs",{message})
 //    res.status(statusCode).send(message);
  })







app.listen(port,(req,res)=>{
    console.log(`your are lisenting to the server ${port}`)
})
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
// const lists=require("./model/schema");
// const wrapasycn=require("./utils/wrapasync");
const Expresserror=require("./utils/expresserrors")
// const {listingschem,reviewSchema}=require("./schema.js");
// const review=require("./model/review.js");

const listings=require("./routes/listing.js");
const reviews=require("./routes/reviews.js");
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





// -----------------------------------------------------------------------------------------------
// let result=listingschem.validate(req.body);
// if(result.error){
//  throw new Expresserror(401,result.error);
// }
// console.log(result);
//main route




 
//  app.use((err,req,res,next)=>{
//    let {StatusCode,message}=err
//    res.status(StatusCode) .render("listing/error.ejs",{message})
// //    res.status(statusCode).send(message);
//  })
app.use("/listings",listings);
 
// ================================================================
//======= REVIEWS======

app.use("/listings/:id/reviews",reviews)










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
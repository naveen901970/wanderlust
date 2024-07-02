const express=require("express");
const router=express.Router();
const lists=require("../model/schema.js");
const wrapasycn=require("../utils/wrapasync");
const Expresserror=require("../utils/expresserrors")
// const {listingschem,reviewSchema}=require("../schema.js");
const listingcontroller=require("../controller/listingsdesign.js")

const {isLoggedin,redirectUrl,isowner, validatelisting}=require("../maddleware.js");
const Route = require("express/lib/router/route.js");






// const validatelisting=(req,res,next)=>{
//     let {error}=listingschem.validate(req.body);
//     if(error){
//         let errmsg=error.details.map((el)=>el.message).join(",");
//         throw new Expresserror(400,errmsg);
//     }else{
//         next()
//     }
// }



router
.route("/")
.get(  wrapasycn(listingcontroller.index))
.post(isLoggedin,
    validatelisting,
     wrapasycn(listingcontroller.creatingdatato_mainpage));



router.get("/new", isLoggedin,listingcontroller.createroute)

router
.route("/:id")
.get( wrapasycn(listingcontroller.showroutedeatils))
.put(isLoggedin,isowner,validatelisting, wrapasycn(listingcontroller.afteredited))
.delete(isLoggedin,isowner, wrapasycn(listingcontroller.deleteroute));



// router.get("/",  wrapasycn(listingcontroller.index));



//create route



//read  show route in deatail
// router.get("/:id", wrapasycn(listingcontroller.showroutedeatils));


///createing new poto and data and direct to  main page
// router.post("/", wrapasycn(listingcontroller.creatingdatato_mainpage));





//editing route
router.get("/:id/edit",isLoggedin, wrapasycn(listingcontroller.rendereditroute))

// router.put("/:id",isLoggedin,isowner,validatelisting, wrapasycn(listingcontroller.afteredited));

//detele route

// router.delete("/:id",isLoggedin,isowner, wrapasycn(listingcontroller.deleteroute));


module.exports=router;
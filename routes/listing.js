const express=require("express");
const router=express.Router();
const lists=require("../model/schema.js");
const wrapasycn=require("../utils/wrapasync");
const Expresserror=require("../utils/expresserrors")
// const {listingschem,reviewSchema}=require("../schema.js");

const {isLoggedin,redirectUrl,isowner, validatelisting}=require("../maddleware.js");






// const validatelisting=(req,res,next)=>{
//     let {error}=listingschem.validate(req.body);
//     if(error){
//         let errmsg=error.details.map((el)=>el.message).join(",");
//         throw new Expresserror(400,errmsg);
//     }else{
//         next()
//     }
// }










router.get("/",  wrapasycn(async(req,res)=>{
    let newlist= await lists.find();
    res.render("./listing/index.ejs",{newlist})
}));



//create route
router.get("/new", isLoggedin,(req,res)=>{
    console.log("this is working");
    res.render("./listing/create.ejs")
});


//read  show route in deatail
router.get("/:id", wrapasycn(async(req,res)=>{
    
    let {id}=req.params;
    let newlist1= await lists.findById(id).populate("reviews").populate("owner");
    console.log(newlist1);
    if(!newlist1){
        req.flash("error","listing you reqested for does not exit!");
        res.redirect("/listings");
    }

    res.render("./listing/show.ejs",{newlist1});
}));


///createing new poto and data and direct to  main page
router.post("/", wrapasycn(async(req,res,next)=>{
    if(!req.body.listing){
       throw new Expresserror(400,"send  a valid data  for listing")
    }
   let newlisting= new lists(req.body.listing);
   newlisting.owner=req.user._id;
      await newlisting.save();
      req.flash("success","New list created!");
   
      res.redirect("./listings")
     

}));





//editing route
router.get("/:id/edit",isLoggedin, wrapasycn(async (req,res)=>{
   let {id}=req.params;
   let newlist1= await lists.findById(id)
   if(!newlist1){
    req.flash("error","listing you reqested for does not exit!");
    res.redirect("/listings");
}
   res.render("./listing/edit.ejs",{newlist1})
}))

router.put("/:id",isLoggedin,isowner,validatelisting, wrapasycn(async(req,res)=>{
 
   let {id}=req.params;
   
   await lists.findByIdAndUpdate(id,{...req.body.listing});
   req.flash("success","Listing Edited successfully!");
   res.redirect(`/listings/${id}`)

}));

//detele route

router.delete("/:id",isLoggedin,isowner, wrapasycn(async(req,res)=>{
   let {id}=req.params;
   await lists.findByIdAndDelete(id);
   req.flash("success","Listing deleted !");
    res.redirect("/listings");
}));


module.exports=router;
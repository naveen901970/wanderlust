const express=require("express");
const router=express.Router();
const lists=require("../model/schema.js");
const wrapasycn=require("../utils/wrapasync");
const Expresserror=require("../utils/expresserrors")
const {listingschem,reviewSchema}=require("../schema.js");






const validatelisting=(req,res,next)=>{
    let {error}=listingschem.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new Expresserror(400,errmsg);
    }else{
        next()
    }
}










router.get("/",  wrapasycn(async(req,res)=>{
    let newlist= await lists.find();
    res.render("./listing/index.ejs",{newlist})
}));



//create route
router.get("/new", (req,res)=>{
    console.log("this is working");
    res.render("./listing/create.ejs")
});


//read  show route in deatail
router.get("/:id", wrapasycn(async(req,res)=>{
    
    let {id}=req.params;
    let newlist1= await lists.findById(id).populate("reviews")
    res.render("./listing/show.ejs",{newlist1})
}));


///createing new poto and data and direct to  main page
router.post("/", wrapasycn(async(req,res,next)=>{
    if(!req.body.listing){
       throw new Expresserror(400,"send  a valid data  for listing")
    }
   let newlisting= new lists(req.body.listing);
      await newlisting.save();
   
      res.redirect("./listings")
     

}));





//editing route
router.get("/:id/edit", wrapasycn(async (req,res)=>{
   let {id}=req.params;
   let newlist1= await lists.findById(id)
   res.render("./listing/edit.ejs",{newlist1})
}))

router.put("/:id",validatelisting, wrapasycn(async(req,res)=>{
 
   let {id}=req.params;
   await lists.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`)

}));

//detele route

router.delete("/:id", wrapasycn(async(req,res)=>{
   let {id}=req.params;
   await lists.findByIdAndDelete(id);
    res.redirect("/listings");
}));


module.exports=router;
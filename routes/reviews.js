const express=require("express");
const router=express.Router({mergeParams:true});
const lists=require("../model/schema");
const wrapasycn=require("../utils/wrapasync");
const Expresserror=require("../utils/expresserrors");
const review=require("../model/review.js");
const {listingschem,reviewSchema}=require("../schema.js");






const validatereview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new Expresserror(400,errmsg);
    }else{
        next()
    }
}









 
// ================================================================
//======= REVIEWS======

router.post("/",validatereview,wrapasycn(async(req,res)=>{
    let newlisting=await lists.findById(req.params.id);
    let newreview=new review(req.body.reviews);


    // await listing.reviews.push(newreview);
     await newlisting.reviews.push(newreview);
    

    await newreview.save();
    await newlisting.save();

   
   res.redirect(`/listings/${newlisting._id}`);

    }));

   
//======------DELETING THE REVIEW ROUTE---------======================

router.post("/:rid",wrapasycn(async(req,res)=>{
    let {id,rid}=req.params;

    await lists.findByIdAndUpdate(id,{$pull:{reviews:rid}});
    await review.findByIdAndDelete(rid);
     
   res.redirect(`/listings/${id}`);
}))


module.exports=router;
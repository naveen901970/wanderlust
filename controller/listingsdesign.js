const lists=require("../model/schema.js");



module.exports.index=async(req,res)=>{
    let newlist= await lists.find();
    res.render("./listing/index.ejs",{newlist})
}

module.exports.createroute=(req,res)=>{
    console.log("this is working");
    res.render("./listing/create.ejs")
}

module.exports.showroutedeatils=async(req,res)=>{
    
    let {id}=req.params;
    let newlist1= await lists.findById(id)
    .populate({path:"reviews",
        populate:{path:"author"}
    })
    .populate("owner");
    // console.log(newlist1);
    if(!newlist1){
        req.flash("error","listing you reqested for does not exit!");
        res.redirect("/listings");
    }

    res.render("./listing/show.ejs",{newlist1});
}
module.exports.creatingdatato_mainpage=async(req,res,next)=>{
    if(!req.body.listing){
       throw new Expresserror(400,"send  a valid data  for listing")
    }
   let newlisting= new lists(req.body.listing);
   newlisting.owner=req.user._id;
      await newlisting.save();
      req.flash("success","New list created!");
   
      res.redirect("./listings")
     

}
module.exports.rendereditroute=async (req,res)=>{
    let {id}=req.params;
    let newlist1= await lists.findById(id)
    if(!newlist1){
     req.flash("error","listing you reqested for does not exit!");
     res.redirect("/listings");
 }
    res.render("./listing/edit.ejs",{newlist1})
 }


 module.exports.afteredited=async(req,res)=>{
 
    let {id}=req.params;
    
    await lists.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Edited successfully!");
    res.redirect(`/listings/${id}`)
 
 }
 module.exports.deleteroute=async(req,res)=>{
    let {id}=req.params;
    await lists.findByIdAndDelete(id);
    req.flash("success","Listing deleted !");
     res.redirect("/listings");
 }
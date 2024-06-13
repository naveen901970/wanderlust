const express=require("express");
const router=express.Router();
const User=require("../model/user");
const wrapasync = require("../utils/wrapasync");
const passport=require("passport");


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup",(wrapasync
    (async(req,res)=>{
   try{
    let {username,email,password}=req.body;
    let newuser=new User(username,email)
    let result=await User.register(newuser,password);
    console.log(result);
    req.flash("success","Wellcome to Wanderlust");
    res.redirect("./listings");

   }catch(e){
       req.flash("error",e.message);
       res.redirect("./signup");
   }
    })))


    router.get("/login",async(req,res)=>{
        res.render("./users/login.ejs")
    })

router.post("/login",
    passport.authenticate('local',
         { failureRedirect: '/login',
            failureFlash:true 
        }),
         async(req,res)=>{
            req.flash("success","Wellcome To Wanderlust ")
 res.redirect("/listings")
})

module.exports=router;
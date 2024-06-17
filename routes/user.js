const express=require("express");
const router=express.Router();
const User=require("../model/user");
const wrapasync = require("../utils/wrapasync");
const passport=require("passport");
const {isLoggedin,saveredirectUrl}=require("../maddleware.js");



router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})

router.post('/signup', wrapasync(async (req, res,next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email }); // Pass an object to the constructor
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err)
            };
            req.flash('success', 'Welcome to Wanderlust');
            res.redirect("/listings");
        })
        
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}));

    router.get("/login",async(req,res)=>{
        res.render("users/login.ejs")
    })

router.post("/login",saveredirectUrl,
    passport.authenticate('local',
         { failureRedirect: '/login',
            failureFlash:true 
        }),
         async(req,res)=>{
            req.flash("success","Wellcome To Wanderlust ")
            let rediect=res.locals.redirectUrl ||  "listings";
 res.redirect(rediect);
})


router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    });
    req.flash("success","you are logged out!");
    res.redirect("/listings");
})


module.exports=router;
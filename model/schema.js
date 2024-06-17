const mongoose = require('mongoose');
const {Schema}=mongoose;
const review=require("./review.js");
const User=require("./user.js")


const listingschema= new Schema({
    title:{
        type:String,
        require:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.mMfDbfeirUydQoXiSlgA9gAAAA?rs=1&pid=ImgDetMain",
        set:(v)=>
            v===""?"https://th.bing.com/th/id/OIP.mMfDbfeirUydQoXiSlgA9gAAAA?rs=1&pid=ImgDetMain":v
        },
        price:{
            type:Number

        },
        location:String,
        country:String,
    //     reviews:[{
    //         type:Schema.Types.ObjectId,
    //         ref:"review"
    //     }
        
    // ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "review"
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
});


listingschema.post("findOneAndDelete",async(lists)=>{
    if(lists.reviews.length){
        await review.deleteMany({_id:{$in:lists.reviews}})
    }
})
const lists=mongoose.model("lists",listingschema)

module.exports=lists;
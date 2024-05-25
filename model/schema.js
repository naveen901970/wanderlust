const mongoose = require('mongoose');
const {Schema}=mongoose;
const review=require("./review.js");


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
        reviews:[{
            type:Schema.Types.ObjectId,
            ref:"review"
        }
    ]
});

const lists=mongoose.model("lists",listingschema)

module.exports=lists;
const mongoose = require('mongoose');
const initdata=require("./data.js");
const lists=require("../model/schema.js");


main().then((res)=>{
    console.log("connection is sucsses")
}).catch((err)=>{
    console.log(err)
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbin');
 
}

let initdb=  async ()=>{
    await lists.deleteMany({});
    await lists.insertMany(initdata.data)
    console.log("working")
}

initdb();
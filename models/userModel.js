import mongoose from "mongoose";



mongoose.connect("mongodb://localhost:27017/mern-ecommerce")

const userSchema = new mongoose.Schema({

name:{
    type:String,
    required:true,
    trim:true /// it will remove all spaces from name
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
     required:true,
},
phone:{
    type:String,
    required:true,
     
},
address:{
    type:String,
    required:true,
    
},
answer:{
    type:String,
    required:true,
    
},

role:{
    type:Number,
    default:0
},

},  {timestamps:true})

export default mongoose.model("users",userSchema)
import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
products :[{
    type:mongoose.Schema.Types.ObjectId
    ,ref : 'products', 
 
}],

payment : {},
buyer : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
},
status : {
    type:String ,
    default:'Not Process',
    enum : ["Not Process" , "Processing" , "Shipped" , "deliver" , "cancel"],
}






},   {timestamps:true}  ) 


export default mongoose.model("Order"  , orderSchema)

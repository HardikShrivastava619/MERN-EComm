import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
console.log(`connected to MongoDB Database ${conn.connection.host }  `);

    } catch (error) {
        console.log( "ERROR in MONGODB"  ,error);
        
    }
}


export default connectDB
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/CategoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import path from 'path'
//config env
dotenv.config()

const app = express()

const _dirname = path.resolve() //for deployment

const corsOptions = {
    origin: ["http://localhost:5173", "https://onestmern-ecommerce-12.onrender.com"],
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));

//middleware
app.use(express.json())
app.use(morgan("dev"))   ///// Using the morgan library in web development is all about making your life easier. It helps you log HTTP requests, which is super useful for debugging and monitoring your application. With morgan, you can quickly see requests and responses, including status codes, response times, and more, in a clean and readable format. This visibility helps you identify and fix issues faster. Want to dive deeper into how it's helping your project specifically?


//routes
app.use(authRoutes)
app.use(categoryRoutes)
app.use(productRoutes)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(_dirname, "/client/dist")));
    app.get("*", (_, res) => {
        res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
    });
}



app.get("/",  (req,res)=>{
    res.send( "<h1> WELCOME TO E-COMMERCE WEBSITE </h1>")})


 const PORT = process.env.PORT


 app.listen(PORT, (err) => {
    if (err) {
        console.error("Server failed to start:", err);
    } else {
        console.log(`Server is started on port ${PORT}`);
    }
});

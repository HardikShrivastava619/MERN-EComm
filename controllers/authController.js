import { comparePassword, hashPassword } from "../helpers/authHelpers.js"
import userModel from "../models/userModel.js"
import JWT from 'jsonwebtoken'
import OrderModel from "../models/OrderModel.js"



export const registerController  = async(req,res)=>{

    try {
        const {answer,name,email,password,address,phone} = req.body
        if (!name) {
            return res.send({message:"Name is required"})
        }
        if (!email) {
            return res.send({message:"Email is required"})
        }
        if (!phone) {
            return res.send({message:"Phone no. is required"})
        }
        if (!password) {
            return res.send({message:"Password is required"})
        }
        if (!address) {
            return res.send({message:"Address is required"})
        }
        if (!answer) {
            return res.send({message:"Answer is required"})
        }
const existingUser = await userModel.findOne({email})
        if (existingUser) {
            return res.status(200).send({
                success:false,
                message:"Alreay Registered please Login"
            })
        }

        const hashedPassword = await hashPassword(password)
const user =  await  userModel.create({name,email,phone,address, answer , password:hashedPassword})
   
res.status(201).send({
    success : true ,
    message:"User Registerd Successfully",
    user
})


} catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })
        
    }
}



// POST LOGIN 

export const loginController = async(req,res)=>{
try {

    const {email,password} =req.body
    if (!email  ||  !password) { 
        return res.status(400).send({
            success:false,
            message:"invalid email or password"
        })
    }
    const user = await userModel.findOne({email})


    if (!user) {
        return res.status(404).send({
            success:false,
            message:"Email is not registered please register before login"
        })}
    const match = await comparePassword(password,user.password)
    if (!match) {
        return res.status(401).send({
            success:false,
            message:"invalid Password"
        })    
    }



const token =  JWT.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:"7d" })


res.status(200).send({
    success:true,
    message:"login Successfully",
    user:{
        _id: user._id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
        answer:user.answer,
        role:user.role
    },
token,

})


} catch (error) {
    res.status(500).send({
        success:false,
        message:"Error in login",
        error:error.message
    })
} 


}

// test controller

export const testController = (req,res)=>{
    try {
        res.send('protected routes')
    } catch (error) {
        res.send(error)
    }
    
}



//// forget password


export const forgetPasswordController = async (req,res)=>{
try {
    
const {email,answer ,newPassword} = req.body

if (!email) {
    res.status(400).send({message:"Email is Required"})
}

if (!answer) {
    res.status(400).send({message:"Answer is Required"})
}

if (!newPassword) {
    res.status(400).send({message:"New Password is Required"})

}

    //check
const user = await userModel.findOne({email,answer})
//validation
if (!user) {
    return res.status(404).send({
        success:false,
        message:'Wrong Email or Answer'
    })
}
const hashed = await hashPassword(newPassword);
await userModel.findByIdAndUpdate(user._id,  {password:hashed})
res.status(200).send({
    success:true,
    message:'Password Reset Successfully'
}) 


} catch (error) {
    res.status(500).send({
        success:false,
        message:'something went wrong',
        error
    })
}
}



/// Update-profile

export const updateProfileController = async (req,res)=>{
    try {
        const {name,email,password,address,phone} = req.body
const user = await userModel.findById(req.user._id)
//password 
if ( !password && password.length < 6) {
    return res.send({error : `Password  is required and 6 character long `})
}
const hashedPassword = password ? await hashPassword(password) : undefined
const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{name:name ||user.name ,
    password: hashedPassword || user.password,
    phone : phone || user.phone,
    address : address || user.address
},{new:true}) 
res.status(200).send({
    success:true,
    message:'Profile Updated Succesfully',
    updatedUser
})


    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error while Update Profile',
            error 
})}}



//////////// getting---Orders
export const getOrderController = async (req,res)=>{
try {
    const  orders =  await OrderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name")
    res.send(orders)
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error while Getting Product",
        error
    })
}
}

//////// get all orders

export const getAllOrderController = async (req,res)=>{
    try {
        const orders = await OrderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createdAt:"-1"})

    } catch (error) {
        console.log(error)
        
    }
}


/// update order 

export const orderStatusController = async (req,res)=>{
    try {
        const {orderId} = req.params
const {status} = req.body
const orders  = await OrderModel.findByIdAndUpdate(orderId,{status},{new:true} )
res.send(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error While Updating Order",
            error
        })
        
    }
}



/// getting users

export const gettingAllUsers = async (req,res ) =>{
    try {
        const allUsers = await userModel.find({})
        res.status(200).send({
            success:true,
            message:'All Users are getted'
            ,allUsers,
        })
    } catch (error) {
        console.log(error)
     res.status(500).send({
        error,
        success:false,
        message:' failed to get All Users '
     })   
    }
}


export const gettingSingleUser = async (req,res)=>{
try {
    const user = await userModel.findById(req.params.id)
    res.status(200).send({
        success:true,
        message:' User is fetched'
        ,user, 
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        error,
        success:false,
        message:' failed to get  user '})
}
}



export const getCustomerOrderController = async(req,res)=>{
    try {
        const customerOrders =  await OrderModel.find({buyer:req.params.id}).populate("products","-photo").populate("buyer","name")
        res.status(200).send({
            message:"Got customers orders",
            success:true,
            customerOrders
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error,
            success:false,
            message:' failed to get customers orders '})
    
        
    }
}




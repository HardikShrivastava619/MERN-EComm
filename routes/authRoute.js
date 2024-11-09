import express from "express"
import { registerController,loginController, testController, forgetPasswordController, updateProfileController, getOrderController, getAllOrderController, orderStatusController, gettingAllUsers, gettingSingleUser, getCustomerOrderController } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

/// router obj 
const router =express.Router()




// ROUTING HERE


// REGISTERATION || POST

router.post("/register", registerController)


// LOGIN || POST


router.post("/login", loginController)



// test routes

router.get("/test",  requireSignIn ,  isAdmin,testController)


//protected-user-route-auth

router.get("/user-auth" , (req,res)=>{
    res.status(200).send({ok:true})
})



//protected-admin-route-auth
 
router.get("/admin-auth"  , requireSignIn ,   isAdmin  , (req,res)=>{
    res.status(200).send({ok:true})
})



/// forget Password


router.post("/forgetPassword" , forgetPasswordController )



/// Update-profile

router.put('/profile' , requireSignIn ,  updateProfileController )


//// order-routes

router.get('/orders' , requireSignIn ,getOrderController )

//// All-order-routes

router.get('/all-orders' , requireSignIn, isAdmin ,getAllOrderController )

//// order-status-update

router.put('/order-status' , requireSignIn, isAdmin ,orderStatusController )

//// getting Users

router.get("/allUsers"  ,  gettingAllUsers )


//// getting Single Users

router.get("/get-User/:id"  ,  gettingSingleUser )

/// getting orders of customer 



router.get('/orders/:id' , getCustomerOrderController )


export default router
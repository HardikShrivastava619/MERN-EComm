import express from "express" 
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { categorycontroler, createcategorycontroler, deleteCategoryController, singlecategorycontroler, updateCategoryController } from '../controllers/categoryController.js'


const router = express.Router()
 
///// router Create-category
 
router.post('/create-category' ,  requireSignIn,isAdmin , createcategorycontroler)

///// router Update-category

router.put('/update-category/:id' , requireSignIn , isAdmin , updateCategoryController)

//// getAll category 

router.get("/get-category"  , categorycontroler )

////single category

router.get("/single-category/:slug"  , singlecategorycontroler )

////Delete Category

router.delete("/delete-category/:id" , requireSignIn , isAdmin , deleteCategoryController )


export default router
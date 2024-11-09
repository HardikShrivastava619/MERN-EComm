import slugify from "slugify"
import categoryModel from '../models/CategoryModel.js'






export const createcategorycontroler = async(req,res)=>{
try {
        let {name}=req.body

        if (!name){
     return res.status(401).send({message:'Name is required'})
    }
    const existingCategory = await categoryModel.findOne({name})
    if (existingCategory) {
        return res.status(200).send({
            success:true,
            message:'Category Already Exists',
        })
    }
    
    
        

    
    const category = await  categoryModel.create({name,slug: slugify(name) })

    
res.status(201).send({
    success: true,
    message:"new Category Created",
    category
})    
} catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in Category"
        })
        
    }
}



export const updateCategoryController = async(req,res)=>{
 try {
    const {name}=req.body
    const {id}=req.params
    const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
      res.status(200).send({
        success:true,
        message:"category updated succesfully"
        ,category
        })


 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error
    })
    
 }   
}



export const categorycontroler = async(req,res)=>{
try {
    const category = await categoryModel.find({})
    res.status(200).send({
        success:true,
        message:"All Categories List",
        category
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Error While getting all Categories '
    })
    
}



}



export const singlecategorycontroler = async(req,res)=>{
try {
    const category = await categoryModel.findOne({slug : req.params.slug})
    res.status(200).send({
        success:true,
        message:'Get Single Category Succesfully ',
        category
    }) 

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,message:'Error while getting Single Category'
    })
}}


export const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params

       await categoryModel.findByIdAndDelete(id)
       res.status(200).send({
        success:true,
        message:"category Deleted successfully"
       })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while deleting category'
        })
        
    }
}
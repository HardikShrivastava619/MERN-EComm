import slugify from "slugify"
import ProductModel from "../models/ProductModel.js"
import fs from 'fs'
import mongoose from 'mongoose';
import categoryModel from '../models/CategoryModel.js' 
import braintree from "braintree";
import OrderModel from "../models/OrderModel.js";
import dotenv from 'dotenv';



 dotenv.config()

/// payment gateway 


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId:  process.env.BRAINTREE_MERCHANT_ID   ,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY ,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY  ,
})








export const createProductController = async(req,res)=>{

    try {
const {name ,slug,  description , price  ,category ,quantity , shipping   } = req.fields
const {photo} = req.files
// validation

switch (true) {
case !name: 
return res.status(500).send({error:'name is required'}) 
case !description:
return res.status(500).send({error:' description is required'}) 
case !price:
return res.status(500).send({error:' price is required'}) 
case !category:
return res.status(500).send({error:'category is required'}) 
case !quantity:
return res.status(500).send({error:'quantity is required'})
case photo && photo.size> 1000000  :
return res.status(500).send({error:' Photo of size less than 1 mb is required  '})        
}
   // Convert category to ObjectId
   const categoryId = new mongoose.Types.ObjectId(category)

   const products = await ProductModel.create({ ...req.fields, category: categoryId, slug: slugify(name) });
     if (photo){ 
        products.photo.data = await fs.promises.readFile(photo.path)
        products.photo.contentType = photo.type
        await products.save(); // Save the product again after adding photo data
     }res.status(201).send({
        success:true,
        message:"Products Created Successfully",
        products
     })} catch(error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Creating Product',
            error,
        })
        
    }

}



export const getProductController = async (req,res)=>{
        try {
     const products =   await ProductModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1}        )    
      
     {res.status(200).send({
        success:true,
        message:"All Products are here",
        countTotal:products.length,
        products,

    })}
    
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:'error in getting products',
            error:error.message
        })

}}


export const getSingleProductController = async (req,res)=>{
try {
     
const product = await ProductModel.findOne({slug:req.params.slug}).select("-photo").populate('category')
res.status(200).send({ 
    success:true,
    message:'Single Product Fetched',
    product
})} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error while getting single product',
        error
    })
    
}

}




export const getPhotoController = async(req,res)=>{
try {
    const  product = await ProductModel.findById(req.params.pid).select("photo")

if (product.photo.data) {
res.set("Content-type" , product.photo.contentType)
return res.status(200).send(product.photo.data)    
}


} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error While getting Photo",
        error
    })}}


    export const deleteProductController = async (req,res)=>{
        try {
            await  ProductModel.findByIdAndDelete(req.params.pid).select("-photo")
            res.status(200).send({
                success:true,
                message:"Product Deleted Successfully",
                    })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,message:"Some Error in Deleting Product",error
            })
            
        }
    }

    ;

    export const updateProductController = async (req, res) => {
      try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
    
        // Validation
        if (!name) return res.status(500).send({ error: 'Name is required' });
        if (!description) return res.status(500).send({ error: 'Description is required' });
        if (!price) return res.status(500).send({ error: 'Price is required' });
        if (!category) return res.status(500).send({ error: 'Category is required' });
        if (!quantity) return res.status(500).send({ error: 'Quantity is required' });
        if (photo && photo.size > 1000000) return res.status(500).send({ error: 'Photo of size less than 1 MB is required' });
    
        // Convert category to ObjectId and validate it
        if (!mongoose.Types.ObjectId.isValid(category)) {
          return res.status(400).send({ error: 'Invalid Category ID' });
        }
        const categoryObjectId = new mongoose.Types.ObjectId(category);
    
        const product = await ProductModel.findById(req.params.pid);
    
        if (!product) {
          return res.status(404).send({ error: 'Product not found' });
        }
    
        product.name = name;
        product.description = description;
        product.price = price;
        product.category = categoryObjectId;
        product.quantity = quantity;
        product.shipping = shipping;
        product.slug = slugify(name);
    
        if (photo) {
          if (!product.photo) {
            product.photo = {}; // Initialize photo as an empty object if undefined
          }
          product.photo.data = await fs.promises.readFile(photo.path);
          product.photo.contentType = photo.type;
        }
    
        await product.save(); // Save the product after updating all fields
    
        res.status(201).send({
          success: true,
          message: 'Product Updated Successfully',
          product
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: 'Error in Updating Product',
          error,
        });
      }
    };


// filter controller

    export const productFiltersController = async  (req,res)=>{
      try {
        
    const {checked , radio } = req.body
    let args = {}
    if(checked.length > 0) args.category = checked 
    if(radio.length) args.price = {$gte:radio[0], $lte: radio[1]}
    const products = await ProductModel.find(args)   
    res.status(200).send({
      success:true,
      products
    })
  } catch (error) {
        console.log(error)
        res.status(400).send({
          success:false,
          message:'Error While Filtering Products',
          error
        })
        
      }
    }





   //  product  Count

   export const productCountController = async (req,res)=>{
    try {
      const total = await ProductModel.find({}).estimatedDocumentCount()
      res.status(200).send({
        success:true,
        total
      })
    } catch (error) {
      console.log(error)
      res.status(400).send({
        success:false,
        message:"Error in Product Count",
        error
      })
      }
   } 

//product list based on page

   export const productListController = async (req,res)=>{
    try {
      const perPage = 4
      const page = req.params.page ? req.params.page : 1 
      const products = await ProductModel.find({}).select("-photo").skip((page - 1)  *  perPage).limit(perPage).sort({createdAt: -1 })
      res.status(200).send({
        success:true,
        products
      })
    } catch (error) {
      console.log(error)
      res.status(400).send({
        success:false,
        error,
        message:"Error in per page ctrl"
      })
      
    }
   }



///// search Product

   export const searchProductController = async (req,res)=>{
    try {
const {keyword} = req.params       
const results = await ProductModel.find({
  $or:[
    {name:{$regex:keyword , $options: "i" }},
    {description: {$regex : keyword , $options :"i"}}
  ]
}).select("-photo")
 res.json(results)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        success:false,
        message:'Error In Search Product API',
        error
      })
    }
   }


   // similar product


   export const relatedProductController = async (req,res)=>{
    try {
      const {pid,cid} = req.params
const products = await ProductModel.find({
  category:cid,
  _id:{$ne:pid},
}).select("-photo").limit(3).populate("category")
res.status(200).send({
  success:true,
  products
})
    } catch (error) {
      console.log(error)
res.status(400).send({
  success:false,
  message:'error while getting related product',
  error
})      
    }
   }


/// get product by category 

export const productCategoryController = async (req,res)=>{
  try {
const category = await categoryModel.findOne({slug:req.params.slug })
const products = await ProductModel.find({category}).populate('category') 
res.status(200).send({
  success:true,
  category,
  products
})} catch (error) {
    console.log(error)
    res.status(400).send({
      success:false,
      error,
      message:'Error while Getting products'
    })
  }
}


/// token

export const braintreeTokenController =  async (req,res)=>{
try {
  gateway.clientToken.generate({} , function(err,response){
    if (err) {
      res.status(500).send(err)
    }else{
      res.send(response)
    }
  })
} catch (error) {
  console.log(error)
}}

//payment 

export const braintreePaymentController = async (req,res)=>{
try {
  const {cartData,nonce} = req.body
  let total = 0
  cartData.map(i => {total += i.price})   
let newTransaction = gateway.transaction.sale({
  amount : total ,
  paymentMethodNonce: nonce,
  options:{
    submitForSettlement:true
} 
}, function(error,result){
  if (result) {
    const order = OrderModel.create({
      products:cartData , 
      payment: result ,
      buyer : req.user._id,
       }) 
  res.json({ok : true})
}else{
  res.status(500).send(error)
}
})} catch (error) {
  console.log(error)}}

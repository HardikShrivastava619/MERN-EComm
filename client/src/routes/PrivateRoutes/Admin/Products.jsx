import React, { useEffect, useState } from 'react'
import AdminMenu from '../../../components/AdminMenu'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
const Products = () => {

const [product,setProducts] = useState([])

 async function getAllProducts() {
  try {
const res = await fetch("https://onestmern-ecommerce-11.onrender.com/get-product")
const data = await res.json()
setProducts(data?.products)


  } catch (error) {
    console.log(error)
    toast.error('something went wrong')
  }
}


useEffect(()=>{
getAllProducts()
},[])





return (<>

    <div   style={{display:"flex",maxWidth:"95rem"   }}  >
    
    
    
    <div style={{width:"22rem" , marginTop:'3rem' , marginLeft:"2rem" }}>  
      <AdminMenu></AdminMenu>
    </div>
    <div  style={{width:"100%"}} >
    <h1 style={{fontWeight:"initial",  }}   className='text-center'> All Products  </h1>
  <div className='d-flex' style={{maxWidth:"72rem",  paddingLeft:"5rem" ,  flexWrap:"wrap",}}  >
    {product.map((p)=>    <Link to={`/dashboard/admin/product/${p.slug}`  } className="products-Link">  
  <div  className='card'  style={{width:"18rem" }}  key={p._id} >  
      
      <img    src={`https://onestmern-ecommerce-11.onrender.com/product-photo/${p._id}`}     className='card-img-top'  style={{maxHeight:"16rem" , borderBottom:"0.2px solid grey  " }}  alt={p.name} />

   
   <div className='card-body'  > <h5 className='card-title' >

{p.name}
     </h5> <p className='card-text'        >
       {p.description}
     </p>      </div>
   </div> </Link>  
     )}
     
     </div>  
        
    
    
    </div>
    
     </div>
    </>
    )
}

export default Products

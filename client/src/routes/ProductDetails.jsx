import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { CartSliceAction } from "../store/CartSlice"
import { useDispatch } from "react-redux"
const ProductDetails = () => {


const params = useParams()
const [product , setProduct] = useState({})
const [relatedProducts , setRelatedProducts] = useState([])
const [pid,setpid] = useState( JSON .parse(localStorage.getItem('CartBtn'))  || []  )
const pidArray = []

const dispatch = useDispatch()



const elm = pid.includes(product._id)







///////////////////////
///////////////////////////////////// handleAddToCart
//////////////
const handleAddToCart = (p)=>{
  const check = pid.includes(p._id) 
  if (check === true) {
  return   toast.info('Already in Cart')
  }else{
    
    dispatch(CartSliceAction.Cart(p))
    toast.success(` ${p.name} Added to Cart` )
    const updatedPid = [...pid, p._id];
     setpid(updatedPid); 
     localStorage.setItem('CartBtn', JSON.stringify(updatedPid));
  }}

  
  
  const handleRemoveToCart = (p)=>{
  dispatch(CartSliceAction.CartItemRemover(p._id)) 
  toast.warning(`${p.name} Removed from cart`)
  const up  =   pid.filter((i)=> i!== p._id  )
  localStorage.setItem('CartBtn' , JSON.stringify(up))
  return setpid(up)
}
  

//inital details
useEffect(()=>{
if (params?.slug) getProduct()
},[params?.slug]  )

//get-Product

const getProduct = async () => {
    try {
        const res = await fetch (`https://onestmern-ecommerce-10.onrender.com/get-product/${params.slug}`)
        const data = await res.json()   

        
        setProduct(data?.product) 
        getSimilarProduct(data?.product._id , data?.product?.category?._id)
    } catch (error) {
        console.log(error)
}}



//get similar product

const getSimilarProduct =async (pid,cid)=>{
  try {
    const res = await fetch(`https://onestmern-ecommerce-10.onrender.com/related-product/${pid}/${cid}`)
 const data = await res.json()
 setRelatedProducts(data?.products)
 
  } catch (error) {
    console.log(error)
    
  }
}



  return (
<div style={{width:'91rem'}} >
<div className="row mt-2  product-details-container "  >     
<div className="col-md-5 mb-2 "   > 
    <img  src={`https://onestmern-ecommerce-10.onrender.com/product-photo/${product._id}`}      style={{height:"27rem" , width:"32rem " , marginLeft:"5rem"  }}   className="card" alt={product.name} />
    
      </div> 
     <div className="col-md-5 "   style={{margin:"2rem"}}  > 
     <h1 className="text-center"  >Product Details </h1>
     <hr />
     <h6  style={{fontWeight:'400'}}> Name: {product.name} </h6>
     <h6  style={{fontWeight:'400'}}> Description: {product.description} </h6>
     <h6  style={{fontWeight:'400'}}> Price:  {product.price} </h6>
     <h6     style={{fontWeight:'400'}}> Category: {product.category?.name}  </h6>
  {pid.includes(product._id) === false ?  <button  className='btn btn-warning'  onClick = { ()=> { handleAddToCart(product)   }  } >  ADD TO CART   </button> :    <button className="btn btn-success"  style={{fontSize:"12px"}}  onClick={() => {  handleRemoveToCart(product) }}>  Remove From Cart </button> }
</div>
 </div>
<div className="row m-2" >    <h3 style={{fontWeight:"initial"}} >    Similar Products </h3> 
{relatedProducts.length < 1 ?  <h4  className="text-center" > No Similar Products Found  </h4>  :  <div className='d-flex' style={{maxWidth:"72rem",  paddingLeft:"5rem" ,  flexWrap:"wrap",}}  >
{relatedProducts.map((p)=>  <div  className='card'  style={{width:"17rem" , margin:'0.5rem'  }}  key={p._id}     >  
    
    <img    src={`https://onestmern-ecommerce-10.onrender.com/product-photo/${p._id}`}     className='card-img-top'  style={{height:"16rem" , borderBottom:"0.2px solid grey  " }}  alt={p.name} />

 
   <div className='card-body'  > 
   <h5 className='card-title'>{p.name} </h5> 
   <p className='card-text'> {p.description.substring(0,30)}...</p>
   <p className='card-text'>${p.price}</p>
   </div>

<div  className='d-flex m-2  '     style={{justifyContent:"space-evenly" }}  >   
{pid.includes(p._id) === false ?  <button  className='btn btn-warning'  onClick = { ()=> { handleAddToCart(p)   }  } >  ADD TO CART   </button> :    <button className="btn btn-success"  style={{fontSize:"12px"}}  onClick={() => {  handleRemoveToCart(p) }}>  Remove From Cart </button> }



</div>


 </div> 
   )}
   </div>    }
 </div>

    </div>
  )
}

export default ProductDetails
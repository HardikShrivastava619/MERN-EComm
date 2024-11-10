import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const CategortyProduct = () => {
const navigate =useNavigate()
const params = useParams()
const [products , setProducts] = useState([])
const [category , setCategory] = useState([])



const getProductsByCat = async ()=>{
    try {
        const res  = await fetch(`https://onestmern-ecommerce-8.onrender.com/product-category/${params.slug}`)
        const data = await res.json()
      
                  
        setProducts(data?.products)
setCategory(data?.category)

    } catch (error) {
        console.log(error);
        
    }
}


useEffect(()=>{
if (params?.slug) getProductsByCat()
} , [params?.slug])

  return (
    <div className="container mt-3 " >

<h4 className="text-center" >  category - {category?.name} </h4>
<h6  className="text-center" >  {products?.length}  result found  </h6>
<div className="row" >  
  
<div className='d-flex' style={{maxWidth:"72rem",  paddingLeft:"5rem" ,  flexWrap:"wrap",}}  >
{products.map((p)=>  <div  className='card'  style={{width:"17rem" , margin:'0.5rem'  }}  key={p._id}     >  
    
    <img    src={`https://onestmern-ecommerce-8.onrender.com/product-photo/${p._id}`}     className='card-img-top'  style={{maxHeight:"16rem" , borderBottom:"0.2px solid grey  " }}  alt={p.name} />

 
 <div className='card-body'  > 
  <h5 className='card-title'>{p.name} </h5> 
   <p className='card-text'> {p.description.substring(0,30)}...</p>
   <p className='card-text'>${p.price}</p> 
   </div>

<div  className='d-flex m-2  '     style={{justifyContent:"space-evenly" }}  >   
<button  className='btn btn-primary'  onClick={()=> navigate(`/product-details/${p.slug}`) }  >   More Details   </button>
<button  className='btn btn-warning  ' >  ADD TO CART   </button>


</div>


 </div> 
   )}
   </div>  
    </div>





    </div>
  )
}

export default CategortyProduct
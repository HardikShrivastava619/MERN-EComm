import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CartSliceAction } from "../store/CartSlice"
import { toast } from "react-toastify"
const Search = () => {

const searchData = useSelector(store=>store.searchData)

const [seaerchedProduct , setSeaerchedProduct] = useState([])
const [pid,setpid] = useState( JSON .parse(localStorage.getItem('CartBtn'))  || []  )
const pidArray = []
const navigate =useNavigate()

const dispatch = useDispatch()


useEffect(()=>{
  setSeaerchedProduct(searchData.results)
},[searchData.results , pid ])




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
    pidArray.push(p._id) 
    setpid(pidArray)
    
  return localStorage.setItem('CartBtn' , JSON.stringify(pidArray))
  }}
  
  const handleRemoveToCart = (p)=>{
  
    dispatch(CartSliceAction.CartItemRemover(p._id)) 
  const up  =   pid.filter((i)=> i!== p._id  )
  localStorage.setItem('CartBtn' , JSON.stringify(up))
  return setpid(up)
  }


  console.log(pid);
  
  

  return (
    
    <div className='d-flex mt-2' style={{maxWidth:"80rem",  paddingLeft:"5rem" ,  flexWrap:"wrap",}}  >


{  seaerchedProduct.length < 1   ? <h1 style={{marginLeft:"30rem"}} > "No Product Found"  </h1> : <> {seaerchedProduct.map((p)=>  <div  className='card'  style={{width:"17rem" , margin:'0.5rem'  }}  key={p._id} >  
    <img src={`http://localhost:8080/product-photo/${p._id}`}     className='card-img-top'  style={{maxHeight:"16rem" , borderBottom:"0.2px solid grey  " }}  alt={p.name} />

 
  <div className='card-body'   > 
  <div  style={{display:'flex' , justifyContent:"space-between"  }} >
  <h5 className='card-title'  >{p.name} </h5> 
  <p className='card-text  '  style={{color:"green"  , fontWeight:"bold"}} >${p.price}</p> 
  </div>
  <p className='card-text'> {p.description.substring(0,30)}...</p>
  </div>

<div  className='d-flex m-2  '     style={{justifyContent:"space-evenly" }}  >   
<button  className='btn btn-primary'  onClick={()=> navigate(`/product-details/${p.slug}`) }  >   More Details   </button>

{pid.includes(p._id) === false ?  <button  className='btn btn-warning'  onClick = { ()=> { handleAddToCart(p)   }  } >  ADD TO CART   </button>
 :    <button className="btn btn-success"  style={{fontSize:"12px"}}  onClick={() => {  handleRemoveToCart(p) }}>  Remove From Cart </button> }
 
 </div>

 </div> 
)} </>
  }

     </div>  
        
  )
}

export default Search
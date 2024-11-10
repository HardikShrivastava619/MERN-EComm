import { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {Checkbox,Radio } from 'antd'
import { Prices } from '../components/Prices'
import {useNavigate} from "react-router-dom"
import { CartSliceAction } from '../store/CartSlice'
import { toast } from "react-toastify"





function Home() { 
 let image =  [   <img  src="/images/diwalidisc.jpeg"/>,<img  src="/images/wal8.jpeg"/>,<img  src="/images/wal2.jpeg"/>,<img  src="/images/sale.jpeg"/>  ,<img  src="/images//wal2.jpeg"/>,<img  src="/images/wal4.jpeg"/>, <img  src="/images/c.jpg"/>  ] 
 const [product,setProduct]  =  useState([])
 const [categories,setCategories]  =  useState([])
 const [checked,setChecked] = useState([])
 const [radio,setRadio] = useState([])
 const [total , setTotal] = useState(0)
 const [page , setPage] = useState(1)
 const [loading , setLoading] = useState(1)
 const [time , setTime] = useState(0)
 const [pid,setpid] = useState( JSON .parse(localStorage.getItem('CartBtn'))  || []  )

const navigate = useNavigate()
const dispatch = useDispatch()









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
  pid.push(p._id)  
return localStorage.setItem('CartBtn' , JSON.stringify(pid))
}}


const handleRemoveToCart = (p)=>{

  dispatch(CartSliceAction.CartItemRemover(p._id)) 
const up  =   pid.filter((i)=> i!== p._id  )
localStorage.setItem('CartBtn' , JSON.stringify(up))
return setpid(up)

}


///////////////// 
/////image changer
///////////////

useEffect(()=>{
  if (time < 6){
  let hj = setInterval(() => {
      setTime(time+1)
    }, 3000);
    return ()=>{
  clearInterval(hj)}  
  }else{ 
  setTime(0)
  }} , [time])
  





/// get Total

const getTotal = async ()=>{
  try {
    
    const res = await fetch("https://onestmern-ecommerce-8.onrender.com/product-count")
    const data = await res.json()
    setTotal(data?.total)
     } catch (error) { 
   console.log(error)}}




  //////////////
  // get- all - Categories
  //////////////

const getAllCategory = async ()=>{

  try {
    const response = await  fetch("https://onestmern-ecommerce-8.onrender.com/get-category")
    const data =  await response.json()
  
  if (data?.success) {
    setCategories(data?.category)
  }} catch (error) {
    console.log(error)
    toast.error("Something went wrong in getting category")
  }}
  
  
  useEffect(()=>{
  getAllCategory()
  getTotal()
  
} , [] )





  //////////////
  // get-Products
  //////////////
  
const getAllProducts = async ()=>{
  try {
    setLoading(true)
    const res =  await fetch (`https://onestmern-ecommerce-8.onrender.com/product-list/${page}`)
    const data = await res.json()    


  
  setProduct(data.products )

  setLoading(false)
} catch (error) {
    console.log(error);
    setLoading(false)
  }
}

useEffect(()=>{
  if (!checked.length || !radio.length ) getAllProducts()
}, []) 



/// load more

const loadMore = async ()=>{

try {
   setLoading(true)
  const res = await fetch (`https://onestmern-ecommerce-8.onrender.com/product-list/${page}`) 
  const data =   await res.json()
  setLoading(false)
  setProduct([...product,...data?.products])
} catch (error) {
console.log(error)
setLoading(false)
}}



useEffect(()=>{ if (page === 1 ) return
  loadMore()  
},[page] )



// filter by Cat
const handleFilter = (value, id )=>{
  let all = [...checked]
  if (value) {
    all.push(id)
  }else{
    all = all.filter(c => c !==id )
  }
  setChecked(all)
}



useEffect(()=>{
  if (checked.length ||  radio.length) filterProducts()
  }, [checked , radio] ) 

//// get filtered products
const filterProducts = async ()=>{
  try {
    const res = await fetch(`https://onestmern-ecommerce-8.onrender.com/product-filters`, {
      method : "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({checked,radio}) 
    })
    const data = await res.json()
    setProduct(data?.products)
  } catch (error) {
    console.log(error)   
  }} 
  
  

  return (<>
  <div style={{display:"flex" , justifyContent:"center"}} >
    <img src={image[time].props.src} alt="network-failed"  style={{width:"53.6rem"  , height:"25rem"}} />
    </div>
  
  <div   style={{display:"flex",maxWidth:"95rem"}}  >
  
  
  
  <div className='text-center'  style={{width:"16rem", marginTop:'1rem'}}>  
    <h4     style={{ marginLeft:"1rem"  }} > Filter By Category  </h4>
<hr />
<div className='d-flex flex-column  m-2 '     >

{categories.map((c)=>  <Checkbox   key={c._id}  onChange={(e)=>handleFilter(e.target.checked , c._id)} > 
{c.name}


</Checkbox> )}
</div>
<hr />
<h4> Filter By Prices  </h4>
<div className='d-flex flex-column'   style={{ alignItems:'flex-start' }}   >
<Radio.Group  onChange={e=> setRadio(e.target.value)} >
  {Prices?.map(p =>(
    <div key={p._id}> <Radio  value={p.array} > {p.name}    </Radio> 
   </div>
    ))}
</Radio.Group>
</div>
<div className='d-flex flex-column '    style={{maxWidth:"12rem"}}   >
<button  className='btn btn-danger m-3 '      onClick={()=> window.location.reload() }  > RESET FILTERS </button>
</div>


  </div>
  <div  style={{width:"100%"  }} > 
    
  

  <div className='d-flex' style={{maxWidth:"80rem",  paddingLeft:"5rem" ,  flexWrap:"wrap",}}  >
{product.map((p)=>  <div  className='card'  style={{width:"17rem" , margin:'0.5rem'  }}  key={p._id} >  
    <img src={`https://onestmern-ecommerce-8.onrender.com/product-photo/${p._id}`}     className='card-img-top'  style={{maxHeight:"16rem" , borderBottom:"0.2px solid grey  " }}  alt={p.name} />

 
  <div className='card-body'   > 
  <div  style={{display:'flex' , justifyContent:"space-between"  }} >
  <h5 className='card-title'  >{p.name} </h5> 
  <p className='card-text  '  style={{color:"green"  , fontWeight:"bold"}} >${p.price}</p> 
  </div>
  <p className='card-text'> {p.description.substring(0,30)}...</p>
  </div>

<div  className='d-flex m-2  '     style={{justifyContent:"space-evenly" }}  >   
<button  className='btn btn-primary'  onClick={()=> navigate(`/product-details/${p.slug}`) }  >   More Details   </button>

{ pid.includes(p._id) === false ?  <button  className='btn btn-warning'  onClick = { ()=> { handleAddToCart(p)   }  } >  ADD TO CART   </button>
 :    <button className="btn btn-success"  style={{fontSize:"12px"}}  onClick={() => {  handleRemoveToCart(p) }}>  Remove From Cart </button> }
 
 </div>

 </div> 
)}
   </div>  
    <div  style={{ marginLeft:"6rem" , margin:'1rem'}} >  {product && product.length < total &&  (
  <button   className='btn btn-warning    '    onClick={(e)=>{
    e.preventDefault()
    setPage(page + 1)
  }} >  {loading ? "Loading" :  "Loadmore" } </button>

    )} </div>
      
  
  </div>
  
   </div>
  </>
  )} 

export default Home
import { useEffect, useState } from "react"
import UserMenu from "../../components/UserMenu"
import { useSelector } from "react-redux"
import moment from 'moment' 
const Order = () => {
  const [orders,setOrders] = useState([])
const logindata = useSelector(s=>s.loginData)

const getOrders = async ()=>{
  try {
  const res =  await fetch(`http://localhost:8080/orders` , {
    headers:{
      "Authorization" : `Bearer ${logindata.token}`
    }
  })
  const data = await res.json()
  console.log(data)
  setOrders(data)
} catch (error) {
  console.log(error);
}}



  useEffect(()=>{
    getOrders()
  },[])
  
  return (
    <div   style={{display:"flex"  }}  >
    
    
    
    <div style={{width:"22rem",margin:"1rem"  }}>  
      <UserMenu/>
    </div>
    <div className="col-md-9  "    >
    <h1 className="text-center mt-4" style={{fontWeight:"lighter"}} >  All Orders  </h1>
   
   {orders?.map((o,i)=>{ 
     return (
       <div  className="border shadow" >
<table className="table" >   
<thead>  
  <tr>
    <th scope="col" >  # </th>
    <th scope="col" >  Status </th>
    <th scope="col" >  Buyer </th>
    <th scope="col" >  Date </th>
    <th scope="col" >  Payment  </th>
    <th scope="col" >  Quantity  </th>
  </tr>
</thead>
<tbody>
    <tr> 
      <td> 
         {i+1}
          </td> 
<td>  {o?.status} </td> 
<td>  {o?.buyer?.name} </td>
<td>  {moment(o?.createAt).fromNow()} </td>
<td>  {o?.payment?.Success  ? " Success" :  "Failed"} </td>
<td>  {o?.products?.length} </td>
           </tr> 
           </tbody>

</table>


<div className="container">
                    {o?.products.map((p,i) => (
                        <div className="row mb-2 card flex-row" key={p._id}>
                            <div className="col-md-4">
                                <img 
                                    src={`http://localhost:8080/product-photo/${p._id}`}
                                    className="card-img-top"
                                    style={{ maxHeight: "12rem", maxWidth: "10rem", borderBottom: "0.2px solid grey" }}
                                    alt={p.name}
                                />
                            </div>
                            <div className="col-md-8 p-2">
                                <p>{p.name}</p>
                                <p>{p.description.substring(0, 30)}...</p>
                                <p>Price: ${p.price}</p>
                               </div>
                        </div>
                    ))}
                

 </div>
</div>
 )})}


    
     </div>
    
     </div>
      )
}

export default Order
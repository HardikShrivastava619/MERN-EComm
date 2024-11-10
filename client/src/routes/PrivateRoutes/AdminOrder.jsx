import { useState,useEffect } from "react"
import AdminMenu from "../../components/AdminMenu"
import { useSelector  } from "react-redux"
import moment from "moment"
import { Select } from "antd"

const AdminOrder = () => {

    const [status , setStatus] =  useState(["Not Process" , "Processing" , "Shipped" , "deliver" , "cancel"])
    const [change ,setChangestatus] = useState("")
    const [orders,setOrders] = useState([])
    const logindata = useSelector(s=>s.loginData)
    
    const getOrders = async ()=>{
      try {
      const res =  await fetch(`https://onestmern-ecommerce-8.onrender.com/orders` , {
        headers:{
          "Authorization" : `Bearer ${logindata.token}`
        }
      })
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.log(error);
    }}
    
    
    
      useEffect(()=>{
        getOrders()
      },[logindata.token])
     


const handleChange = async (orderId , v)=>{
    try{
        const res = await fetch(`https://onestmern-ecommerce-8.onrender.com/orders-staus/${orderId}` , {
method:"PUT",
headers:{
    "Content-Type": "application/json",
    "Authorization": `Bearer ${logindata.token}`
},
body: JSON.stringify({status:v})
        })
        const data = await res.json()        
      
        }catch (error) {
        console.log(error)
    }
}


return (
    <div  className="row" style={{  width:'94rem' }}  >
<div className="col-md-3 m-2"    > <AdminMenu/> </div>
<div className="col-md-8" >  <h1 className="text-center" > All Orders </h1> 
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
    <th scope="col" > Payment  </th>
    <th scope="col" > Quantity  </th>
  </tr>
</thead>
<tbody>
    <tr> 
      <td> 
         {i+1}
          </td> 
<td>  <Select bordered={false}  onChange={(v)=>handleChange(o. _id , v)}  defaultValue={o?.status}  >   {status.map((s,i)=>(<Option   key={i} value={s} > {s}   </Option>))}   </Select> </td> 
<td>  {o?.buyer?.name} </td>
<td>  {moment(o?.createAt).fromNow()} </td>
<td>  {o?.payment?.Success  ? " Success" :  "Failed"} </td>
<td>  {o?.products?.length} </td>
           </tr> 
           </tbody>

</table>


<div className="container  " >
                    {o?.products.map((p,i) => (
                        <div className="row mb-2 card flex-row" key={p._id}>
                            <div className="col-md-4">
                                <img 
                                    src={`https://onestmern-ecommerce-8.onrender.com/product-photo/${p._id}`}
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
)}

export default AdminOrder
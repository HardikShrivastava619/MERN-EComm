
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import moment from "moment"
const UserIDs = () => {
const params = useParams()
    const [user , setUser] = useState([])
    
  const [orders,setOrders] = useState([])


async function getUser() {
    try {
        const res = await fetch (`https://onestmern-ecommerce-10.onrender.com/get-User/${params.id}`)
        const data = await res.json()   
        
        setUser(data?.user)
    } catch (error) {
        console.log(error)
}
}




const getOrders = async ()=>{
    try {
    const res =  await fetch(`https://onestmern-ecommerce-10.onrender.com/orders/${params.id}` , {
    })
    const data = await res.json()
    
    setOrders(data?.customerOrders)
  } catch (error) {
    console.log(error);
  }}
  
  
  
    
  




useEffect(()=>{
getUser()
getOrders()
},[params?.id])


return (<div className="d-flex"   >




<div  className="text-center" style={{width:"10rem" , borderRight:"1px solid silver" ,  }}  >   
<h5 style={{marginTop:"3rem"}} >  Name: </h5><hr />

<h5 style={{marginTop:"3rem"}} >  Email: </h5><hr />
<h5 style={{marginTop:"3rem"}}>  Phone no.: </h5><hr />
<h5 style={{marginTop:"3rem"}}>  Address: </h5><hr />
<h5 style={{marginTop:"3rem"}}>  Role: </h5><hr />
<h5 style={{marginTop:"3rem"}}>  Date: </h5><hr />
<h5 style={{marginTop:"3rem"}}>  Id: </h5><hr />
</div>
<div  style={{width:"22rem"}}>
<p style={{marginTop:"3rem", marginLeft:"2rem"}}> {user.name} </p><hr />
<p style={{marginTop:"3rem", marginLeft:"2rem"}}> {user.email} </p><hr />
<p style={{marginTop:"3rem", marginLeft:"2rem"}}> {user.phone} </p><hr />
<p style={{marginTop:"3rem", marginLeft:"2rem"}}> {user.address} </p><hr />
<p style={{marginTop:"3rem", marginLeft:"2rem"}}> {user.createdAt} </p><hr />
<p style={{marginTop:"3rem", marginLeft:"2rem"}}> {user.role} </p><hr />
<p style={{marginTop:"3rem", marginLeft:"2rem"}}> {user._id} </p><hr />
</div>
<div   className="col-md-8"  style={{  marginTop:"12px"  , marginLeft:"6rem"  }} >  

{orders?.map((o,i)=>{ 
     return (<>
       <div  className=" col-md-8 "   style={{borderBottom:"4px solid violet"}} > 
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
<td>  {o?.createdAt} </td>
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
                                    src={`https://onestmern-ecommerce-10.onrender.com/product-photo/${p._id}`}
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
  </>
 )})}
 </div>













</div>  )
}

export default UserIDs
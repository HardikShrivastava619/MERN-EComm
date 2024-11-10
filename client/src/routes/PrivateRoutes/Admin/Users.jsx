import { useEffect, useState } from "react"
import AdminMenu from "../../../components/AdminMenu"
import { Link } from "react-router-dom"


const Users = () => {


  const [users , setUsers]=useState([])

const gettingUsers = async()=>{
  try {
    const res = await fetch (`https://onestmern-ecommerce-10.onrender.com/allUsers`) 
  const data =   await res.json()

setUsers(data?.allUsers)

  } catch (error) {
    console.log(error);
    
  }
}

useEffect(()=>{
  gettingUsers()
},[])




  return (

<div   style={{display:"flex"  }}  >



<div style={{width:"22rem" , marginTop:'3rem' , marginLeft:"2rem" }}>  
  <AdminMenu></AdminMenu>
</div>



<div className="col-md-8 m-3 "    >
    <h1 className="text-center mt-4" style={{fontWeight:"lighter"}} >  All Orders  </h1>
   
   {users?.map((u,i)=>(
       <div  className="border shadow" >
<table className="table" >   
<thead>  
  <tr>
    <th scope="col" >  # </th>
    <th scope="col" >  Name </th>
    <th scope="col" >  Email </th>
    <th scope="col" >  Date </th>
    <th scope="col" >  Role  </th>
    <th scope="col" >  Address  </th>
    
    <th scope="col" >  ID  </th>
  </tr>
</thead>
<tbody>
    <tr> 
      <td> 
         {i+1}
          </td> 
<td>  {u?.name} </td> 
<td>  {u?.email} </td>
<td>  {u?.createdAt} </td>
<td>  {u?.role} </td>
<td>  {u?.address} </td>

<td>  {u?._id.substring(0,8)}<Link to={`/dashboard/admin/userIDs/${u?._id}`}  >...</Link>
   </td>
           </tr> 
           </tbody>

</table>


</div>
 ))}


    
     </div>
</div>
  )
}

export default Users
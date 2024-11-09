import AdminMenu from "../../../components/AdminMenu"
import { useState , useEffect } from "react"
import { toast } from "react-toastify";
import CategoryForm from "../../../components/Forms/CategoryForm";
import { useSelector } from "react-redux";
import {Modal} from 'antd'

const CreateCategory = () => {



const [categories    ,   setCategories] = useState([])
const [name,setName] =   useState("")  
const logindata   =   useSelector(s=>s.loginData)
const [open, setOpen] = useState(false);
const [selected, setselected] = useState(null);
const [updatedName, setUpdatedName] = useState("");


   const token = logindata.token


async function handleSubmit (e) {
  e.preventDefault()
  
  try {
    
    console.log(name)
  
    const response = await fetch("http://localhost:8080/create-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({name}),
    });

    let data = await response.json()
    console.log(data);
    
    
if (data?.success) {
  getAllCategory()
    toast.success( `${data.category.name}   is Created`)
   }else{
toast.error(data.message)

}

} catch (error) {
console.log(error)
toast.error("something went wrong in input form")
    
  }
}



const getAllCategory = async ()=>{

try {
  const response = await  fetch("http://localhost:8080/get-category")
  const data =  await response.json()

if (data?.success) {
  setCategories(data?.category)
}} catch (error) {
  console.log(error)
  toast.error("Something went wrong in getting category")
}}


useEffect(()=>{
getAllCategory()
} , [] )



async function handleUpdate(e) {
  e.preventDefault()
  try {

    const res = await fetch(`http://localhost:8080/update-category/${selected}`  , {
      method:"PUT",
      headers:{
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify({name:updatedName})
          })
      
         const data = await  res.json()
      console.log(data)
      if (data.success) {
        toast.success(data.message)
        setselected(null)
        setUpdatedName(" ")
        setOpen(false)
        getAllCategory()
      }else{
        toast.error(data.message)
          
}} catch (error) {
  console.log(error)
  
    toast.error("something went wrong")
  }
}

//============================>
// Delete Product 
//============================>  

async function handleDelete(pId) {
  
  try {

    const res = await fetch(`http://localhost:8080/delete-category/${pId}`  , {
      method:"DELETE",
      headers:{"Authorization": `Bearer ${token}`
      },
      body:JSON.stringify({name:updatedName})
          })
      
         const data = await  res.json()
      if (data.success) {
        toast.success(data.message)
        setOpen(false)
        getAllCategory()
      }else{
        toast.error(data.message)
          
}} catch (error) {
  console.log(error)
  
    toast.error("something went wrong")
  }
}



  return (
<>

<div   style={{display:"flex"  }}  >



<div style={{width:"22rem" , marginTop:'3rem' , marginLeft:"2rem" }}>  
  <AdminMenu></AdminMenu>
</div>
<div  style={{width:"100%"}} >
<h1 style={{marginLeft:"2rem", marginTop:"2rem" ,fontWeight:"lighter",  }}  >Manage category</h1>
<div className="p-3 w-50"   >  <CategoryForm    handleSubmit={handleSubmit} value={name}  setValue={setName}  /></div>
<div  style={{marginLeft:"2rem" ,   overflowY:"auto"  , maxHeight:"250px"  }} >
  
  <table className="table">
  
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {categories.map((c)=>(
    <>
    <tr>
<td key={c._id} > {c.name}  </td>
  <td> 
    <button className="btn btn-primary m-2 " onClick={()=>{setOpen(true) , setUpdatedName(c.name), setselected(c._id);
       }} > Edit </button>
    <button  className="btn btn-danger "  onClick={()=>{ handleDelete(c._id) }}  >  Delete </button>
     </td>
</tr>
  </>
))}  
  



  </tbody>
</table></div>
<Modal  onCancel={()=>  setOpen(false)} footer={null} open={open}    > 
  <CategoryForm  value={updatedName}  setValue={setUpdatedName}   handleSubmit={handleUpdate} ></CategoryForm>
  
   </Modal>




</div>

 </div>
</>
    )
}

export default CreateCategory
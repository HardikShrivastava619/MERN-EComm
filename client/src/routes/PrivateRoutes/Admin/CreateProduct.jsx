import AdminMenu from "../../../components/AdminMenu"
import { toast } from "react-toastify";
import { useState , useEffect, useRef } from "react"
import {Select} from "antd"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const {Option} = Select

const CreateProduct = () => {

const navigate = useNavigate()

  const [categories    ,   setCategories] = useState([])
  const [name,setName] =   useState("")  
  const [description, setDescription] = useState(" ");
  const [price , setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
  
const logindata = useSelector(s=>s.loginData)
const token = logindata.token


    
//===================>
// handle Create
//===================>

async function handleCreate(e) {
  e.preventDefault()

  try {
 const productData = new FormData()  ///// form data is browsers propertie 
 productData.append("name" , name)
 productData.append("description" , description)
 productData.append("price" , price)
 productData.append("quantity" , quantity)
 productData.append("photo" , photo)
 productData.append("category" , category)
 
 const res = await   fetch("https://mern-ecomm-62pn.onrender.com/create-product" , {
   method:"POST",
   headers:{
     "Authorization": `Bearer ${token}`
  },
    
    body: productData
  })
 const data = await res.json()
    if (data?.success) {
      toast.success("Product Created Successfully")
      navigate("/dashboard/admin/products")
}else{
  toast.error(data?.message)

}}catch (error) {
    console.log(error)
    toast.error("something went wrong")
}}


//===================>
// get category
//===================>
  
  const getAllCategory = async ()=>{

    try {
      const response = await  fetch("https://mern-ecomm-62pn.onrender.com/get-category")
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
    
    


  return (

<div   style={{display:"flex"  }}  >



<div style={{width:"22rem" , marginTop:'3rem' , marginLeft:"2rem" }}>  
  <AdminMenu></AdminMenu>
</div>
<div className="m-1" >   
<h1 style={{marginLeft:"2rem", marginTop:"2rem" ,fontWeight:"lighter" }}  >Create Product</h1>
  <form   onSubmit={handleCreate} >

  <Select variant={false}    placeholder="select a category" showSearch  className="form-select  "  style={{width:"40rem" , height:"2.5rem", marginLeft:"2rem"}} onChange={(value)=> setCategory(value) }  >
  
  {categories.map((c)=><Option key={c._id} value={c._id}  > {c.name} </Option>  )}  </Select>
 <div  className="imageUploader">  
<label  className="btn btn-outline-secondary  col-md-12 " > {photo ? photo.name : "Upload Photo" }   
<input type="file" name="photo" accept="image/*" onChange={(e)=> setPhoto(e.target.files[0])} hidden  />
</label>
</div>



<div className="mt-3" >
{photo && (<div className="text-center" >   <img src={URL.createObjectURL(photo)} alt="error_in_Loading "  height="200" className="img img-responsive" />    </div>)}

</div>

<div  className="mt-3"  >  <input type="text" value={name}  placeholder="write a name"  className="form-control"  onChange={(e)=> setName(e.target.value)} /> 
  </div>
  <div  className="mt-3"  >  <textarea type="text" value={description}  placeholder="write a description"  className="form-control"  onChange={(e)=> setDescription(e.target.value)} /> 
  </div>
  <div  className="mt-3"  >  <input type="number" value={price}  placeholder="write a Price "  className="form-control"  onChange={(e)=> setPrice(e.target.value)} /> 
  </div>
  <div  className="mt-3"  >  <input type="number" value={quantity}  placeholder="write a quantity"  className="form-control"  onChange={(e)=> setQuantity(e.target.value)} /> 
  </div>

<Select  variant={false} placeholder="Select Shipping"  size="large"  showSearch     className="form-select mt-2"   onChange={(value)=>{setShipping(value)}}    >

<Option value="1">Yes</Option>
<Option value="0">No</Option>
</Select>
 <button className="btn btn-primary mt-3"   > Create Product </button>  
 </form>
  
</div>




 </div>

  )
}

export default CreateProduct
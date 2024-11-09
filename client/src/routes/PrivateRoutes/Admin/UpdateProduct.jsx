import AdminMenu from "../../../components/AdminMenu"
import { toast } from "react-toastify";
import { useState , useEffect } from "react"
import {Select} from "antd"
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const {Option} = Select

const UpdateProduct = () => {

const navigate = useNavigate()

  const [categories    ,   setCategories] = useState([])
  const [name,setName] =   useState("")  
  const [description, setDescription] = useState(" ");
  const [price , setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setID] = useState("");
    const [ categoryName ,setCategoryName]  = useState("")
    const params = useParams()

  
const logindata = useSelector(s=>s.loginData)
const token = logindata.token



    
//===================>
// handle Update
//===================>
  async function handleUpdate(e) {
    e.preventDefault()
  
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", categoryID)
  
  
      const res = await fetch(`http://localhost:8080/update-product/${id}`, {
        method: "PUT",
        headers: {    
          "Authorization": `Bearer ${token}`
        },
        body: productData
      })
  
  
      const data = await res.json();
      if (data?.success) {
        toast.success("Product Updated Successfully")
        navigate("/dashboard/admin/products")
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  

//===================>
// handle Delete
//===================>

 async function handleDelete() {
  try {
    const ans = window.prompt("Are you sure you want to Delete This Product")
    if (!ans) {
      return
    }
    const res = await fetch(`http://localhost:8080/delete-product/${id}` ,  {
  method:'DELETE',
})
const data = await res.json()

if (data?.success) {
  toast.success(`${name} Deleted Successfully`)
navigate("/dashboard/admin/products")
}

  } catch (error) {
    console.log(error)
    toast.error("Something went wrong")
    
  }
 } 





//===================>
// get single product 
//===================>

const getSingleProduct = async(req,res)=>{
  try {
    
const res =  await fetch(`http://localhost:8080/get-product/${params.slug}`)

const data =  await res.json()


setID(data.product._id)
setName(data.product.name)
setDescription(data.product.description)
setPhoto(data.product.photo)
setQuantity(data.product.quantity)
setPrice(data.product.price)
setCategoryID(data.product.category._id)
setCategoryName(data.product.category.name)
setShipping(data.product.shipping)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error
    })
    
  }
}



useEffect(()=>{
getSingleProduct()
},[])


    


  return (

<div   style={{display:"flex"    }}  >



<div style={{width:"22rem" , marginTop:'3rem' , marginLeft:"2rem" }}>  
  <AdminMenu></AdminMenu>
</div>
<div className="m-1" >   
<h1 style={{marginLeft:"2rem", marginTop:"2rem" ,fontWeight:"lighter" }}  >Update Product</h1>
  
  <Select variant={false}    placeholder="select a category" showSearch  className="form-select  "  style={{width:"40rem" , height:"2.5rem", marginLeft:"2rem"}}   value={categoryName}  >
    </Select>
 
 
 <div  className="imageUploader">  
  
   <label  className="btn btn-outline-secondary  col-md-12 " > {photo ? photo.name : "Upload Photo" }   
  <input type="file" name="photo" accept="image/*" onChange={(e)=> setPhoto(e.target.files[0])} hidden  />
  </label>
    </div>



<div className="mt-3" >
{photo ?   (<div className="text-center" > 

<img src={URL.createObjectURL(photo)} alt="error_in_Loading "  height="200" className="img img-responsive"   />    </div>) 

:

(<div className="text-center" > 

<img   src={`http://localhost:8080/product-photo/${id}`}   alt="error_in_Loading "  height="200" className="img img-responsive"   />    </div>)


}

</div>

<div  className="mt-3"  >  <input type="text" value={name}  placeholder="write a name"  className="form-control"  onChange={(e)=> setName(e.target.value)} /> 
  </div>
  <div  className="mt-3"  >  <textarea type="text" value={description}  placeholder="write a description"  className="form-control"  onChange={(e)=> setDescription(e.target.value)} /> 
  </div>
  <div  className="mt-3"  >  <input type="number" value={price}  placeholder="write a Price "  className="form-control"  onChange={(e)=> setPrice(e.target.value)} /> 
  </div>
  <div  className="mt-3"  >  <input type="number" value={quantity}  placeholder="write a quantity"  className="form-control"  onChange={(e)=> setQuantity(e.target.value)} /> 
  </div>

<Select  variant={false} placeholder="Select Shipping"     size="large"  showSearch     className="form-select mt-2"   onChange={(value)=>{setShipping(value)}}    value={shipping ? "Yes" : "No"  }      >

<Option value="1">Yes</Option>
<Option value="0">No</Option>
</Select>
 <button className="btn btn-primary mt-3  mb-3  "style={{display:"block"}}  onClick={handleUpdate}  > Update Product </button>  
 <button className="btn btn-danger  mt-2  mb-3 " onClick={handleDelete}  > Delete Product </button>  
</div>




 </div>

  )
}

export default UpdateProduct
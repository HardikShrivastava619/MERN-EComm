import { useRef } from "react"
import UserMenu from "../../components/UserMenu"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { registerSliceAction } from "../../store/registerSlice"
import { loginSliceAction } from "../../store/loginSlice"
const Profile = () => {
 
  const registerData = useSelector(s=>s.registerdata)
  

   const loginData = useSelector(s=>s.loginData)
 
 
const dispatch = useDispatch()

   const nameref = useRef()
  const emailref = useRef()
  const passwordref = useRef()
  const phoneref = useRef()
  const addressref = useRef() 
  


  const handleUpdateSubmit = async(event)=>{
    event.preventDefault()
     
const name = nameref.current.value
const email = emailref.current.value
const password =    passwordref.current.value
const phone = phoneref.current.value
const address = addressref.current.value


try {
  let response = await fetch("http://localhost:8080/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${loginData.token}`
    },
    body: JSON.stringify({ name, email, password, phone, address })
    })

  let data = await response.json();
 
  dispatch(loginSliceAction.updateUser(data))
      
  } catch (error) {
  toast.error("Something went wrong");
  console.log(error);
}}

 
 
 
 
  return (


    <div  style={{display:"flex", width:"94.6rem"   }}  >
    
    
    
    <div style={{width:"22rem" , marginTop:'3rem' , marginLeft:"2rem" }}>  
      <UserMenu/>
    </div>
   
<div className="update-container"   >

<form  onSubmit={handleUpdateSubmit}  className="register-form" > 

<h3  className="register-form-heading">  USER PROFILE </h3>

  <div className="mb-3">
    <input type="text" className="  form-control "  ref={nameref}  placeholder={ loginData.user.name   || "Enter Your Name"}  id="name"   />
  
  </div>
  <div className="mb-3">
 <input type="email"  className="   form-control "   ref={emailref} placeholder="Enter Your Email"    id="email"   />
    </div>
  <div className="mb-3">
    <input type="password" className="form-control "   ref={passwordref} placeholder="Enter Your Password" id="password"  />
    
  </div>
  
  <div className="mb-3">
    <input type="number" className=" form-control "      ref={phoneref}  placeholder={loginData.user.phone ||"Enter Your Phone" } id="phone"  />
  </div>
 
  <div className="mb-3">
    <input type="text" className=" form-control " ref={addressref}  placeholder={loginData.user.address ||"Enter Your Address"} id="address"   />
  </div>
 

  <button type="submit" className="btn btn-success"   >UPDATE</button>
</form></div>  </div>
    
    
    
  )
}

export default Profile
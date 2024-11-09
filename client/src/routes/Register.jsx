import {  useRef, useState } from "react"
import { toast } from "react-toastify"
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { registerSliceAction } from "../store/registerSlice"


function Register() {

const dispatch = useDispatch()

const nameref = useRef()
const emailref = useRef()
const passwordref = useRef()
const phoneref = useRef()
const addressref = useRef() 
 const answerref = useRef()


  const navigate =  useNavigate()

const handleRegisterSubmit = async(event)=>{
    event.preventDefault()
     
const name = nameref.current.value
const email = emailref.current.value
const password =    passwordref.current.value
const phone = phoneref.current.value
const address = addressref.current.value
const answer = answerref.current.value


try {
  let response = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password, phone, address, answer })
  })

  let data = await response.json();
  console.log(data)
  

  if (response.ok && data.success) {
    toast.success(data.message);
    navigate("/Login");
 dispatch(registerSliceAction.register({ name, email, password, phone, address,answer }))
 
  } else {
    toast.error(data.message);
  }
} catch (error) {
  toast.error("Something went wrong");
  console.log(error);
}}


return (
<div className="register-container">

<form  onSubmit={handleRegisterSubmit}  className="register-form" > 

<h3  className="register-form-heading">  REGISTER FORM </h3>

  <div className="mb-3">
    <input type="text" className="  form-control "  ref={nameref}  placeholder="Enter Your Name"  id="name"  required />
  
  </div>
  <div className="mb-3">
 <input type="email"  className="   form-control "   ref={emailref} placeholder="Enter Your Email"    id="email1"  required />
    </div>
  <div className="mb-3">
    <input type="password" className="form-control "   ref={passwordref} placeholder="Enter Your Password" id="password"  required/>
    
  </div>
  
  <div className="mb-3">
    <input type="number" className=" form-control "      ref={phoneref}  placeholder="Enter Your Phone" id="phone"  required/>
  </div>
 
  <div className="mb-3">
    <input type="text" className=" form-control " ref={addressref}  placeholder="Enter Your Address" id="address"  required />
  </div>
 
  <div className="mb-3">
    <input type="text" className=" form-control " ref={answerref}  placeholder="Which is Your Favorite sports" id="answer"  required />
  </div>

  <button type="submit" className="btn btn-success"   >REGISTER</button>
</form></div>
)
}  


export default Register
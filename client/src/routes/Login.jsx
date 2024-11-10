import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginSliceAction } from "../store/loginSlice";
function Login() {
  
  const dispatch = useDispatch()
const location = useLocation()
const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLoginSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await fetch("https://onestmern-ecommerce-10.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data = await response.json()

      
      if (response.ok && data.success) {
        toast.success(data.message)
        

       
        
        dispatch (loginSliceAction.login(data))
        
        navigate(  location.state || '/'  )
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="Login-container">
      <form onSubmit={handleLoginSubmit} className="Login-form">
        <h3 className="Login-form-heading">LOGIN FORM</h3>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email1"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            id="password"
            required
          />
        </div>
      
        <button type="submit" className="btn btn-primary">LOGIN</button>
        <p   className="forgetpassword"  type="submit"  onClick={()=>{navigate('/forget-password')}} > Forget Password </p>
      </form>
    </div>
  );
}

export default Login;
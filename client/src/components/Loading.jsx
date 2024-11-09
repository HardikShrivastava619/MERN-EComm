import {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
function Loading({path = 'Login'}) {

 const[count ,setCount]=  useState(3)
const navigate = useNavigate()
const location = useLocation()

 useEffect(()=>{  

 
    const interval = setInterval(()=>{

      setCount((a)=> --a )
    }   , 1000    )
    count === 0 && navigate(`/${path}`, {
      state:location.pathname
    })
   
    return  ()=> clearInterval(interval)
   
    
  },[count,navigate,location,path])






    return <center className="Login-container" >
  <h1     style={{   fontWeight:'lighter' }} >   Redirecting to you in {count} seconds  </h1> 
     <div className="spinner-border " style={{width: "3rem" ,height: "3rem"    }} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  
    
    </center>
}
export default Loading
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PrivateSliceAction } from "../../../store/Private"
import { Outlet } from "react-router-dom"
import Loading from "../../../components/Loading"

const Admin = () => {

const privatedata = useSelector(store=>store.privateData)



const logindata = useSelector(store=>store.loginData)
const dispatch = useDispatch()
const token = logindata.token

useEffect(()=>{

async function logindatacheck() {
  const res = await fetch("https://onestmern-ecommerce-11.onrender.com/admin-auth", {
    headers:{
      "Authorization":   `Bearer ${token}`
    }
  })
    
  const data = await res.json()
  if (data.ok) {
    dispatch(PrivateSliceAction.tokenData(true))
  }else{
    dispatch(PrivateSliceAction.tokenData(false))
    
  }
}


if (logindata?.token) logindatacheck()
},[logindata])

return <>  
{privatedata  ? <Outlet/>  : <Loading path=""  />  }
 </> 
  
}

export default Admin
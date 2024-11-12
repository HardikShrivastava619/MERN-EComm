import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PrivateSliceAction } from "../../store/Private"
import { Outlet } from "react-router-dom"
import Loading from "../../components/Loading"

const Private = () => {

const privatedata = useSelector(store=>store.privateData)



const logindata = useSelector(store=>store.loginData)
const dispatch = useDispatch()

useEffect(()=>{

async function logindatacheck() {
  const res = await fetch("https://mern-ecomm-62pn.onrender.com/user-auth", {
    headers:{
      "Authorization": logindata?.token
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
},[logindata?.token])

return <>  
{privatedata  ? <Outlet/>  : <Loading/>}
 </> 
  
}

export default Private
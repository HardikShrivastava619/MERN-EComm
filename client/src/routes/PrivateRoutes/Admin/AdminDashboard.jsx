import AdminMenu from "../../../components/AdminMenu"
import {useSelector} from "react-redux"



const AdminDashboard = () => {

const logindata = useSelector(s=>s.loginData)


  return <>



<div   style={{display:"flex"  }}  >



<div style={{width:"22rem" , marginTop:'3rem' , marginLeft:"2rem" }}>  
  <AdminMenu></AdminMenu>
</div>
<div className="card w-95 p-3  "  style={{margin:'3rem'}}  >
<h3>  Admin Name:  {logindata.user.name}  </h3>
<h3>  Admin Email:  {logindata.user.email}  </h3>
<h3>  Admin Contact:{logindata.user.phone}  </h3>
 </div>

 </div>

    

  </>
}

export default AdminDashboard









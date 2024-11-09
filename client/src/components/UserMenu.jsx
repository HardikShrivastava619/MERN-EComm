import { Link } from "react-router-dom"




const UserMenu = () => {


return <div className="list-group" >
    <h4 style={{ display:'flex' ,justifyContent:"center" , fontWeight:'lighter' }} > Daashboard </h4>
  <Link    to="/dashboard/user/profile" className="list-group-item admin-options"style={{ display:'flex',justifyContent:"center" , }}  aria-current="true" > Profile </Link>
  <Link  to="/dashboard/user/order" className="list-group-item admin-options  "  style={{ display:'flex' ,justifyContent:"center" }} aria-current="true" > Orders</Link>
  
    </div>
}

export default UserMenu
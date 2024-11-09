import { Link } from "react-router-dom"




const AdminMenu = () => {


return <div className="list-group" >
    <h4 style={{ display:'flex ', backgroundImage:"linear-gradient(0deg, #ffdee9 30% , gold 70%)" ,justifyContent:"center", alignItems:"center"  , fontWeight:'bolder'  ,color:'indigo', height:"3rem"   }} > Admin Panel</h4>
  <Link    to="/dashboard/admin/create-category" className="list-group-item admin-options "style={{ display:'flex' ,justifyContent:"center" , }}  aria-current="true" > Create Category </Link>
  <Link  to="/dashboard/admin/create-product" className="list-group-item admin-options  "  style={{ display:'flex' ,justifyContent:"center" }} aria-current="true" > Create  Product</Link>
  <Link    to="/dashboard/admin/products" className="list-group-item admin-options "style={{ display:'flex' ,justifyContent:"center" , }}  aria-current="true" > Products </Link>
  <Link    to="/dashboard/admin/orders" className="list-group-item admin-options "style={{ display:'flex' ,justifyContent:"center" , }}  aria-current="true" > Orders </Link>
  <Link  to="/dashboard/admin/users" className="list-group-item   admin-options  "style={{ display:'flex' ,justifyContent:"center" }} aria-current="true" > Users</Link>
  
  
    </div>
}

export default AdminMenu 
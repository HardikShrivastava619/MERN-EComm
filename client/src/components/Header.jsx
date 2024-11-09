import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { loginSliceAction } from "../store/loginSlice";
import { toast } from "react-toastify";
import SearchInput from "./Forms/SearchInput";
import useCategory from "../hooks/useCategory";
import { Badge } from "antd";



function Header() {
    
    const  cartData   = useSelector(store => store.cartData)
    const  logindata  = useSelector(store=>store.loginData)
    const  categories = useCategory()  


const dispatch = useDispatch()

function logOutClick() {
  dispatch(loginSliceAction.logout())
toast.success("Logout Succesfully")

}



    return <>

<nav className="navbar navbar-expand-lg  header-maindiv header-container "  style={{backgroundImage:"linear-gradient(0deg, #ffdee9 30% , gold 70%)"}}  >
  <div className="container-fluid  "  >
    <a className="navbar-brand" href="#">
<h4  style={{color:"indigo"}} >    <FaCartShopping to="/" /> HDK-MARKET</h4></a>  
    <div className="  navbar-container " id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
<SearchInput></SearchInput>

        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page" >HOME</Link>
        </li>
        <li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle"   data-bs-toggle="dropdown" >
    CATEGORIES
  </Link>
  <ul className="dropdown-menu">
    {categories?.map((c) => (
      <li key={c._id}>
     <Link to={`/category/${c.slug}`} className="dropdown-item">
        {c.name}
      </Link>
      </li>
     ))}
  </ul>
</li>



{logindata?.user   ? <li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle"   data-bs-toggle="dropdown" >
{logindata?.user?.name}
     </Link>
  <ul className="dropdown-menu">
    <li><Link to={`/dashboard/${logindata?.user?.role===1?'admin':'user'}`} className="dropdown-item">DASHBOARD</Link></li>
    <li  onClick={logOutClick} > <Link   className="dropdown-item"  to="Login" >LOGOUT</Link></li>
        
     
     </ul>
     </li> :  <>
       
     <li className="nav-item">
          <Link  to="Login" className="nav-link active" >LOGIN</Link>
        </li>
       
       
        <li className="nav-item">
          <Link  to="register" className="nav-link active" > REGISTER </Link>
        </li>
        </>    }










 
 
        
        <li className="nav-item ">
 <Badge count={cartData?.length} showZero >   
 <Link     to="/cart"      className="nav-link " >
            <h6>CART</h6>
          </Link>
 </Badge>
 </li>
 </ul>
 </div>
 </div>
 </nav>


    </>
}

export default Header
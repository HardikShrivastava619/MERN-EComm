import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider , createBrowserRouter} from "react-router-dom"
import App from "./App"
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './routes/About'
import Contact  from './routes/Contact'
import Policy from './routes/Policy' 
import PagenotFound from './routes/PageNotFound'
import Category from './routes/Category'
import Home from  './routes/Home' 
import Register from './routes/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './routes/Login'
import {Provider} from 'react-redux'
import finalStore from './store'
import ForgetPassword from './routes/ForgetPassword'
import PrivateDashboard from './routes/PrivateRoutes/PrivateDashboard'
import Private from './routes/PrivateRoutes/Private'
import AdminDashboard from './routes/PrivateRoutes/Admin/AdminDashboard'
import Admin from './routes/PrivateRoutes/Admin/Admin'
import Layout from './components/Layout'
import CreateProduct from './routes/PrivateRoutes/Admin/CreateProduct'
import CreateCategory from './routes/PrivateRoutes/Admin/CreateCategory'
import Users from './routes/PrivateRoutes/Admin/Users'
import Profile from './routes/PrivateRoutes/Profile'
import Order from './routes/PrivateRoutes/Order'
import 'antd/dist/reset.css'
import Products from './routes/PrivateRoutes/Admin/Products'
import UpdateProduct from './routes/PrivateRoutes/Admin/UpdateProduct'
import ProductDetails from './routes/ProductDetails'
import Search from './routes/Search'
import CategortyProduct from './routes/CategortyProduct'
import CartPage from './routes/CartPage'
import AdminOrder from './routes/PrivateRoutes/AdminOrder'
import UserIDs from './routes/PrivateRoutes/UserIDs'


let router = createBrowserRouter([
  {path:"/" , element:<App/> , children:[
    {path:"/" , element:<Home/> },
    {path:"/cart" , element:<CartPage/> },
    {path:"/category/:slug" , element:<CategortyProduct/> },
    {path:"/product-details/:slug" , element:<ProductDetails/> },
    {path:"/search" , element:<Search/> },
    {path:"/forget-password" , element:<ForgetPassword/>},
    {path:"/dashboard" , element:<Private/>,   children:[
      {path:"user" , element:<PrivateDashboard/> },
      {path:"/dashboard/user/profile" , element:<Profile/> },
      {path:"/dashboard/user/order" , element:<Order/> },
      
    ] },
    
    
    
    
    {path:"/layout" , element:<Layout/>},
    
    
    {path:"/dashboard" , element:<Admin/>,   children:[
        {path:"/dashboard/admin/userIDs/:id" , element:<UserIDs/> } ,
        {path:"admin" , element:<AdminDashboard/> },
        {path:"/dashboard/admin/create-category" , element:<CreateCategory/> },
        {path:"/dashboard/admin/create-product" , element:<CreateProduct/> },
        {path:"/dashboard/admin/product/:slug" , element:<UpdateProduct/> },
        {path:"/dashboard/admin/products" , element:<Products/> },
        {path:"/dashboard/admin/users" , element:<Users/> },
        {path:"/dashboard/admin/orders" , element:<AdminOrder/> }

      ] },

      {path:"/logout" , element:<Login/> },
{path:"/About" , element:<About/> },
{path:"/Login" , element:<Login/> },
{path:"/Register" , element:<Register/> },
{path:"/Contact" , element:<Contact/> },
{path:"/Policy" , element:<Policy/> },
{path:"/Category" , element:<Category/> },
{path:"*" , element:<PagenotFound/> },
    ]
   




  }]



  )

createRoot(document.getElementById('root')).render(

<StrictMode>
 <Provider   store={finalStore} >
<ToastContainer position='top-center' />
    <RouterProvider  router={router} />
    </Provider>
    </StrictMode>
)

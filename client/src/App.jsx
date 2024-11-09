import Header from "./components/Header"
import Layout from "./components/Layout"
import Footer from "./components/Footer" 
import { Outlet } from "react-router-dom"

 


function App() {
  
  return (
  <> 
   <Header></Header>
  <div  style={{maxHeight:"34rem",    overflowY:"auto"}} >
  <Layout> 
 
<Outlet/>

   </Layout>   
   </div>
  
  <Footer></Footer>
  </>
 )
}

export default App

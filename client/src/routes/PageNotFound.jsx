import { Link } from "react-router-dom"

function PagenotFound() {
    return <div style={{ display:'flex' , flexDirection:'column' ,alignItems:'center', justifyContent:"center", width:'95rem' , height:'30rem'  }} >
    <h1 className="pnfh1 "  >   404 </h1>
    <p className="pnfp" > Oops ! Page not found  </p>
     <Link  className="pnfL"> Go back </Link>
    </div>
}

export default PagenotFound
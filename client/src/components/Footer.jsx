import {Link} from 'react-router-dom'


function Footer() {
    return (
        <>
        
        <div className="text-light p3 footer-main-container "   style={{backgroundColor:"indigo"}}   >
            <h2 className="text-center">
All Right Reserved &copy; HDK
            </h2>

<p className=' text-center footer-link' >  <Link  to="About" className='text-light ' >About |</Link>
<Link  to="Contact" className='text-light ' >Contact  |</Link>

<Link   to="Policy" className='text-light ' >Privacy Policy</Link>


    </p>


        </div>
        </>
    )
}

export default Footer
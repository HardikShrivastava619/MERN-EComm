import {BiMailSend,BiPhoneCall,BiSupport} from 'react-icons/bi'
 

function Contact() {
    return <div className="main-contactdiv" >
    <img className="contact-img" src="../public/images/c.jpg" alt="network-prob" />
          <div>
        <h1 className="contactUS-heading" > CONTACT US </h1>
        <p  className="text-grey" > any query and info about product feel free to call anytime <br /> we are available for 24X7  </p>
        <p  className="text-grey" > <BiMailSend/>:www.help@ecommerceapp.com  </p>
        <p  className="text-grey" > <BiSupport/>:012-3456789</p>
        <p  className="text-grey" > <BiPhoneCall/>:1800-0000-0000  (toll free)</p>
        
        
        
        
        </div>
    </div>
}

export default Contact
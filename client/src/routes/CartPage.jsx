import { useDispatch, useSelector } from "react-redux";
import { CartSliceAction } from "../store/CartSlice";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
    const [Loading , setLoading] = useState(false);
    const [instance , setInstance] = useState(null);
    const [clientToken , setClientToken ] = useState("");
    const cartData = useSelector(s => s.cartData);
    const loginData = useSelector(s => s.loginData);
    const [pid,setpid] = useState( JSON .parse(localStorage.getItem('CartBtn'))  || []  )
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // Total Price
    function totalPrice() {
        try {
            let total = 0;
            cartData?.map(i => { total = total + i.price });
            return total.toLocaleString("en-us" ,{style:"currency" , currency:"USD" } )
        } catch (error) {
            console.log(error);
        }
    }

    const handlePayment = async () => {
        setLoading(true)
        
        try{
            const { nonce } = await instance.requestPaymentMethod();
            const res = await fetch(`https://onestmern-ecommerce-8.onrender.com/braintree/payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${loginData?.token}`
                },
                body: JSON.stringify({ nonce, cartData })
            })
            
            const data = await res.json()

            setLoading(false);
            localStorage.removeItem("Ecommerce-Web-Cart-Product");
            dispatch(CartSliceAction.cartItem());
            navigate("/dashboard/user/order")
            toast.success('Payment Completed Successfully')
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    // delete Product
    function removeCartItem(p) {
        try {
            dispatch(CartSliceAction.CartItemRemover(p._id))
            toast.success(`${p.name} Removed From Cart`);
            const up  =   pid.filter((i)=> i!== p._id  )
            localStorage.setItem('CartBtn' , JSON.stringify(up))
            return setpid(up)
             
        } catch (error) {
            console.log(error);
        }
    }

    // get payment gateway token
    const getToken = async () => {
        try {
            const res = await fetch('https://onestmern-ecommerce-8.onrender.com/braintree/token');
            const data = await res.json()
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { getToken() }, [loginData?.token]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center bg-light p-2">
                        {`Hello ${loginData.token && loginData.user.name}`}
                    </h1>
                    <h4 className="text-center">
                        {cartData.length > 0 
                            ? `You Have ${cartData.length} items in your cart ${loginData?.token ? "" : "please login to checkout"}`
                            : "Your Cart is Empty"}
                    </h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    {cartData.map((p) => (
                        <div className="row mb-2 card flex-row" key={p._id}>
                            <div className="col-md-4">
                                <img 
                                    src={`https://onestmern-ecommerce-8.onrender.com/product-photo/${p._id}`}
                                    className="card-img-top"
                                    style={{ maxHeight: "12rem", maxWidth: "10rem", borderBottom: "0.2px solid grey" }}
                                    alt={p.name}
                                />
                            </div>
                            <div className="col-md-8 p-2">
                                <p>{p.name}</p>
                                <p>{p.description.substring(0, 30)}...</p>
                                <p>Price: ${p.price}</p>
                                <button className="btn btn-danger" onClick={() => { removeCartItem(p) }}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-3 text-center">
                    <h4>Cart Summary</h4>
                    <p>Total | Checkout | Payment</p>
                    <hr />
                    <h4>Total: {totalPrice()}</h4>
                    {loginData?.user?.address ? (
                        <>
                            <div className="mb-3">
                                <h4>Current Address</h4>
                                <h5>{loginData?.user?.address}</h5>
                                <button className="btn btn-outline-warning" onClick={() => navigate(`/dashboard/user/profile`)}>Update Address</button>
                            </div>
                        </>
                    ) : (
                        <div className="mb-3">
                            {loginData?.token ? (
                                <button className="btn btn-outline-warning" onClick={() => navigate(`/dashboard/user/profile`)}>Update Address</button>
                            ) : (
                                <button className="btn btn-outline-warning" onClick={() => navigate(`/login`, { state: "/cart" })}>Please Login to checkout</button>
                            )}
                        </div>
                    )}
                    
<div className="mt-2" >
                     {clientToken &&   <div className="mt-2" >
                      <DropIn
            options={{ authorization: clientToken }}
            onInstance={(i)=>setInstance(i)}
          />
          <button className="btn btn-primary mb-2  " onClick={handlePayment}  disabled={ !instance || !loginData?.user?.address}> {Loading  ? "Processing ..."   :  "Make Payment"  } </button>
          </div>} 
  
          {!clientToken && <> <h1> Loading... </h1>  <p> connecting to network   </p> </>}
          </div>           
                </div>
                </div>
                </div>
    );
};
export default CartPage;

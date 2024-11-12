import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgetPassword() {

const navigate = useNavigate()

  const emailRef = useRef();
  const answerRef = useRef();
  const newPasswordRef = useRef();

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    try {
      let email = emailRef.current.value;
      let newPassword = newPasswordRef.current.value;
      let answer = answerRef.current.value;

      const response = await fetch("https://mern-ecomm-62pn.onrender.com/forgetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword, answer }),
      });

      let data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message)
        navigate("/Login")
         function setint() {
        setTimeout(() => {
          toast.info("Now You can Login By Your New Password ")
        }, 3000);
        }
         setint() 
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="ForgetPassword-container">
      <form onSubmit={handleResetSubmit} className="Login-form">
        <h3 className="Login-form-heading">RESET PASSWORD</h3>
        <div className="mb-3">
          <input
            ref={emailRef}
            type="email"
            className="form-control"
            placeholder="Enter Your Email ID"
            id="email1"
            required
          />
        </div>
        <div className="mb-3">
          <input
            ref={answerRef}
            className="form-control"
            placeholder="Which is your Favorite Sport"
            required
          />
        </div>
        <div className="mb-3">
          <input
            ref={newPasswordRef}
            type="password"
            className="form-control"
            placeholder="Enter Your New Password"
            id="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-warning">
          RESET
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;

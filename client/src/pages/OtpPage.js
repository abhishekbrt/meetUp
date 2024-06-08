import React from "react";
import Footer from "../components/Footer";
import { useRef,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
// import axios from "axios";
import userContext from "../context/MyContext";

export default function OtpPage() {
  // State to manage the value of the OTP input
 
  const otp=useRef();
  const {userEmail}=useContext(userContext);
  const navigate=useNavigate();
  console.log(userEmail);


 

  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(otp.current.value);

    const data=await fetch('http://192.168.1.23:3045/api/verify',{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        email:userEmail,
        verificationCode:otp.current.value,
      }),
    });

    const json=await data.json();
    localStorage.setItem('token',json.token);
    if (json?.message === "Email verified!") {
      navigate("/about");
    } else {
      console.log(json?.message);
    }
    // try{
    //   const email=userEmail;
    //   const verificationCode=otp.current.value;
    //   const response=await axios.post('http://localhost:3045/verify',{email,verificationCode});
    //   console.log(response);

    // }
    // catch(err){
    //   console.log('error while sending VerificationCode :',err);

    // }



  };

  return (
    <>
      {/* Main OTP page container */}
      <div className="h-screen bg-slate-700 flex justify-center items-center">
        {/* OTP form container */}
        <div className=" h-2/4 w-11/12 sm:w-2/4 sm:h-2/4 md:w-2/5 md:h-2/4
         shadow-md shadow-gray-400 rounded-lg bg-slate-900 flex flex-col overflow-hidden">
          {/* Header section */}
          <div className=" mt-10 flex flex-col justify-center items-center">
            <p className=" text-white text-2xl sm:text-4xl ">We Sent you a OTP</p>
            <p className=" mt-2 text-white text-xl sm:text-2xl ">Please enter it below to verify your email</p>
            <p className=" text-red-500 text-xs sm:text-base ">{userEmail}</p>
          </div>
          {/* OTP input form section */}
          <div className=" mt-4 flex justify-center items-center ">
            {/* Form for OTP input */}
            <form onSubmit={handleSubmit}>
              <div className="my-5  ">
                
                {/* OTP input field */}
                {/* <div className="text-sm sm:text-lg pb-2 text-white">OTP :</div> */}
                <input
                  type="text"
                  name="otp"
                  placeholder="OTP..."
                  autoComplete="off"
                  maxLength={8}
                  required
                  className="w-full px-4 sm:px-6 py-2 rounded-lg"
                  ref={otp}
                />
              </div>
              {/* Submit button */}
              <div className="flex flex-col items-center justify-center">
                <button
                  className="bg-slate-400 px-12 py-2 rounded-lg hover:bg-slate-600 hover:text-white"
                  id="sub_btn"
                  type="submit"
                >
                  Validate
                </button>
                <div className=" mt-4 text-white">
                  Didn't recieved OTP?{" "}
                  <Link className=" text-blue-500" to={"/login"}>
                    Send again
                  </Link>
                </div>
              </div>
              
            </form>
          </div>
        </div>
      </div>
      {/* Footer component */}
      <Footer />
    </>
  );
}

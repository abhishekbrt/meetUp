import React from "react";
import { Link } from "react-router-dom";
import { useState,useContext } from "react";
import "../styles/main.css";
import Footer from "../components/Footer";
import Validate from "../utils/validateData";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
// import axios from "axios";
import userContext from "../context/MyContext";



export default function RegisterPage() {
  // const url=import.meta.env.SERVER_URL;
  const{setUserEmail}=useContext(userContext);
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    const formData = {
      email: email.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value,
    };

    setUserEmail(formData.email);
 
    const errors = Validate.register(formData);
    console.log(Object.keys(errors).length);
    setIsSubmit(true);
    setFormErrors(errors);
    if (Object.keys(errors).length !== 0) {
      console.log("password does not match");
      return;
    }

    const data=await fetch('http://192.168.1.23:3045/api/register',{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        email:formData.email,
        password:formData.password,
        confirmPassword:formData.confirmPassword,
      }),
    });
    const json=await data.json();

    // localStorage.setItem("token", json.token);
    if (json?.message === "account created!") {
      navigate("/verify");
    } else {
      console.log(json?.message);
    }
   

    // try {
    //   const response = await axios.post("http://localhost:3045/register", {
    //     formData,
    //   });
    //   console.log(response.status);
    //   console.log(response.statusText);
    //   console.log(JSON.stringify(response.data));
    //   // navigate("/verify");
    // } catch (error) {
    //   if (error.response) {
    //     // The server responded with a status code outside of the range 2xx
    //     console.error("Server responded with an error:", error.response.data);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     console.error(
    //       "Request was made but no response was received:",
    //       error.request
    //     );
    //   } else {
    //     // Something happened in setting up the request that triggered an error
    //     console.error(
    //       "An error occurred while setting up the request:",
    //       error.message
    //     );
    //   }
    // }
  };

  return (
    <>
      <div className=" bg-slate-700 h-screen flex justify-center items-center flex-col">
        <div>
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <p className=" text-white">Registered successfully</p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="bg-slate-900 shadow-md shadow-gray-400 sm:h-2/3 md:h-2/3 lg:h-2/3 xl:w-1/3 rounded-lg flex flex-col items-center">
          {/* heading text */}
          <div className="h-[10%]  px-6 sm:px-10 py-4 md:py-4 font-bold text-4xl text-white">
            Create New Account
          </div>
          <div className="h-[90%] w-full px-4 sm:px-8 pt-1 ">
            {/* form started */}
            <form className="h-full " onSubmit={registerUser}>
              {/* email */}
              <div className="my-5">
                <div className="text-sm sm:text-lg pb-2 text-white">Email:</div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email..."
                  autoComplete="off"
                  required
                  className="w-full px-4 sm:px-6 py-2 rounded-lg"
                  ref={email}
                />
              </div>
              <p className=" text-red-400">{formErrors.email}</p>

              {/* password */}
              <div className="mt-5 mb-2">
                <div className="text-sm sm:text-lg pb-2 text-white">
                  Password:
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={password}
                  autoComplete="off"
                  required
                  className="w-full px-4 sm:px-6 py-2 rounded-lg"
                />
              </div>
              <p className=" text-red-400">{formErrors.password}</p>
              {/* confirm password */}
              <div className="mt-5 mb-2">
                <div className="text-sm sm:text-lg pb-2 text-white">
                  Confirm Password:
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Password"
                  ref={confirmPassword}
                  autoComplete="off"
                  required
                  className="w-full px-4 sm:px-6 py-2 rounded-lg"
                />
              </div>
              <p className=" text-red-400">{formErrors.confirmPassword}</p>

              <div className="  my-3 py-2 flex flex-col gap-2 items-center justify-center">
                <button
                  className=" bg-slate-400 px-12 py-2 rounded-lg hover:bg-slate-600 hover:text-white"
                  id="sub_btn"
                  type="submit"
                >
                  Register
                </button>
                <div className="text-white">
                  Already Registered?{" "}
                  <Link className=" text-blue-500" to={"/login"}>
                    Login Here
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

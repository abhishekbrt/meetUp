import { useState, useRef,useContext} from "react";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import Validate from "../utils/validateData";
import "../styles/main.css";
import userContext from "../context/MyContext";


import Footer from "../components/Footer";

function LoginPage() {
  
  const email = useRef();
  const password = useRef();
  const {userEmail}=useContext(userContext);
  const navigate=useNavigate();
 
  console.log(userEmail)
  // const url=import.meta.env.SERVER_URL;


  const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();

    const formData = {
      email: email.current.value,
      password: password.current.value,
    };
    const errors = Validate.login(formData);
    // setIsSubmit(true);
    setFormErrors(errors);
    if (Object.keys(errors).length !== 0) {
      return;
    }

    const data=await fetch('http://192.168.1.23:3045/api/login',{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        email:formData.email,
        password:formData.password,
      }),
    });

    const json=await data.json();
    if (json?.message === "Login Successfull!") {
      localStorage.setItem('token',json.token);
      navigate("/about");
    } else {
      console.log(json?.message);
    }

    // try {
    //   const response = await axios.post("http://localhost:3045/login", {
    //     formData,
    //   });
    //   console.log(response.status);
    //   console.log(response.statusText);
    //   console.log(JSON.stringify(response.data));
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
      <div className=" bg-slate-700 h-screen flex justify-center items-center">
        <div className="bg-slate-900 shadow-md shadow-gray-400 sm:h-2/3 md:h-2/4 lg:h-3/5 xl:w-1/3 rounded-lg flex flex-col items-center">
          {/* heading text */}
          <div className="h-1/6 mt-2 px-6 sm:px-10 py-4 md:py-6 font-bold text-4xl text-white">
            Welcome! Back
          </div>
          <div className="h-5/6 w-full px-4 sm:px-8 pt-2">
            {/* form started */}
            <form className="h-full" onSubmit={loginUser}>
              {/* email */}
              <div className="my-5">
                <div className="text-sm sm:text-lg pb-2 text-white">Email:</div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email..."
                  ref={email}
                  autoComplete="off"
                  required
                  className="w-full px-4 sm:px-6 py-2 rounded-lg"
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
              <div className="text-right text-sm font-light text-white">
                Forgot password?
              </div>
              <p className=" text-red-400">{formErrors.password}</p>

              <div className="my-3 py-2 flex flex-col sm:flex-row gap-2 items-center justify-center">
                <button
                  className="bg-slate-400 px-6 py-2 rounded-lg hover:bg-slate-600 hover:text-white"
                  id="sub_btn"
                  type="submit"
                >
                  Login
                </button>
                <div className="text-sm text-white sm:text-lg mt-2 sm:mt-0">
                  New user?{" "}
                  <Link className="text-blue-500" to={"/register"}>
                    Register Here
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

export default LoginPage;

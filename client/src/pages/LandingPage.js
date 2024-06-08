import React from "react";
import { Link } from "react-router-dom";

// import bgImage from '../assets/bg.jpg'
// import Button from "../components/button";
import Footer from "../components/Footer";
import "../styles/main.css";
import image_students from "../assets/landingPage.jpg";

export default function LandingPage() {
  

  return (
    <>
      <div className=" h-screen">
        {/* header section */}
        <div className=" h-1/10 w-full bg-sky-200 sticky top-0 z-50 flex flex-row-reverse">
          <div className=" w-1/5  mr-20 flex items-center place-content-around">
            <div className="header_button">
              <Link to={"/login"}>Login</Link>
            </div>

            <div className="header_button">
              <Link to={"register"}>Register</Link>
            </div>

            <div className="header_button">
              <Link to={'/about'}>About Us</Link>
            </div>
          </div>
        </div>
        {/* main body section */}
        <div className=" h-9/10 bg-slate-100  flex justify-center items-center ">
          <div className=" bg-red-200 h-5/6 w-11/12 rounded-xl flex items-center place-content-around">
            <div className=" h-9/10 w-3/5 bg-slate-200 rounded-lg text-center">
              <h1>This is landing Page</h1>
            </div>
            <div className=" h-9/10 w-1/3 bg-slate-300 rounded-lg">
              <img
                className=" h-full w-full rounded-lg"
                src={image_students}
                alt="happy students"
              />
            </div>
          </div>
        </div>
      </div>
     
      <Footer />
    </>
  );
}



import React from "react";
// import {Link } from 'react-router-dom';

import bgImage from '../assets/bg.jpg'
import Button from "../components/button";


export default function LandingPage(){

    function search(formData){
        const query=formData.get("query");
        if(query===""){
            alert("please type your name");

        }
        console.log(query);
    }

    return (
       <div style={background} className=" flex justify-center items-center flex-col">
        <h1 className="text-white font-extrabold text-6xl ">Login/Register Page</h1>
        <div>
        <Button button_name={'Login'} pageroute={'login'}></Button>
        <Button button_name={'Register'} pageroute={'register'}></Button>
        </div>
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                const formData=new FormData(e.target)
                // console.log(formData);
                // console.log(e.target);
                // if(formData.get("query")===""){
                //     alert("please type your name");

                // }
                
                search(formData);
            }}>
                <input name="query" />
                <button type="submit">Submit</button>


            </form>
        </div>




       </div>
    );
}

const background={
    width: "100%",
    height: "100vh",
    background: `url(${bgImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"

}
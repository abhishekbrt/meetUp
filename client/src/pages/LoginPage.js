// import Button from "../components/button";
// import Input from "../components/Input";
import { useState } from "react";
import React from "react";
import  './LoginPage.css';

function LoginPage() {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(formData);
  };

  return (
    <div className=" text-center mx-20 my-auto">
     
        <h2>Welcome !</h2>

        <form  onSubmit={handleSubmit}>
          <p>
            <label>Username:</label>
            <br />
            <input
              type="text"
              name="username"
              placeholder="Username..."
              value={formData.username}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </p>

          <p>
            <label>Email:</label>
            <br />
            <input
              type="text"
              name="email"
              placeholder="email..."
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </p>

          <p>
            <label>Password:</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </p>

          <p>
            <button  id="sub_btn" type="submit">
              Login
            </button>
          </p>
        </form>
      
    </div>
  );
}

// const formStyle = {
//   display: "inline-block",
//   background: "#f3f3f3",
//   border: "1px solid #ddd",
//   borderradius: "2px",
//   padding: "2rem",
//   margin: "2rem 0 1rem",
// };

// const subBtn = {
//   display: "block",
//   width: "100%",
//   background: "#222",
//   color: "#fff",
//   borderradius: "3px",
// };

export default LoginPage;

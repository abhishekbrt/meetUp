import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginPage from "./pages/LoginPage.js";
import LandingPage from "./pages/LandingPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import PageNotFound from "./pages/PageNotFound.js";
import OtpPage from "./pages/OtpPage.js";
import VideoPage from "./pages/VideoPage.js";
import MyProvider from "./context/MyProvider.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="/about" element={<OtpPage email='abhishekbharti.yz@gmail.com' />} /> */}
            <Route path="/about" element={<VideoPage />} />
            <Route path="/verify" element={<OtpPage />} />

            <Route />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MyProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

import React from "react";
import { useRef, useContext, useState } from "react";
import userContext from "../context/MyContext";
import Footer from "../components/Footer";
import statusHandler from "../services/userStatusHandler";

export default function VideoPage() {
  const video = useRef();
  const video2 = useRef();
  const { userEmail } = useContext(userContext);
  console.log(userEmail);
  const [flag, setFlag] = useState(false);

  const handleStart = async () => {
    const selfVideo = video.current;
    const hostVideo = video2.current;

    const constraints = { audio: true, video: true };

    console.log('video started! enjoy');

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(stream);
    console.log(stream.getVideoTracks()[0].getSettings().aspectRatio);
    selfVideo.srcObject = null;
    hostVideo.srcObject = stream;
    statusHandler(1);
    setFlag(true);
  };

  const handleStop = () => {
    const selfVideo = video.current;
    const hostVideo = video2.current;
    selfVideo.srcObject = null;
    hostVideo.srcObject = null;
    statusHandler(0);

    setFlag(false);
  };

  if (flag) {
    window.addEventListener("beforeunload", () => {
      statusHandler(0);
    });
    window.addEventListener("popstate", () => {
      statusHandler(0);
    });
  }

  return (
    <>
      <main className=" h-screen  bg-black flex flex-col ">
        <div className=" h-[90%] bg-gray-500 flex justify-end items-end">
          <div className=" h-full w-full">
            <video
              ref={video2}
              className=" w-full h-full object-cover scale-x-[-1]"
              // width="full"
              // height="full"
              autoPlay
            ></video>
          </div>

          <div className=" h-[26.66%] w-[20%] bg-red-400 absolute  origin-bottom-right ">
            <video
              ref={video}
              className="bg-red-500 w-full h-full object-cover"
              // width="full"
              // height="full"
              autoPlay
            ></video>
          </div>
        </div>

        <div className=" h-[10%] bg-gray-200 flex justify-center items-center">
          <button
            className=" bg-green-300 px-4 py-1 mx-2  hover:bg-green-600"
            onClick={handleStart} disabled={flag}
          >
            Start
          </button>
          <button className=" bg-green-300 px-4 py-1 mx-2  hover:bg-green-600">
            Next
          </button>
          <button
            className=" bg-green-300 px-4 py-1 mx-2  hover:bg-green-600"
            onClick={handleStop}
          >
            End
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

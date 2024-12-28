import React from "react";
import playStore from "./playstore.png";
import appStore from "./Appstore.png";

const Footer = () => {
  return (
    <footer className="flex  mt-10 justify-evenly">
      <div>
        <h4 className="text-black font-bold text-2xl mb-5">DOWNLOAD OUR APP</h4>
        <p className="text-gray-500 font-bold text-xl mb-5">Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" className="h-16 w-30 mb-5"/>
        <img src={appStore} alt="Appstore" className="h-16 w-30"/>
      </div>

      <div >
        <h1 className="text-black font-bold text-2xl mb-5 ">ECOMMERCE.</h1>
        <p className="text-gray-500 font-bold text-xl mb-5">High Quality is our first priority</p>

        <p className="text-gray-500 font-bold text-xl mb-5">Copyrights 2024 &copy; Swalawalkar30</p>
      </div>

      <div className="flex flex-col ">
        <h4 className="text-black font-bold text-2xl mb-5">Follow Me</h4>
        <a className="text-gray-500 font-bold text-xl mb-2" href="https://www.youtube.com/@shriramwalawalkar4114">Youtube</a>
      </div>
    </footer>
  );
};

export default Footer;
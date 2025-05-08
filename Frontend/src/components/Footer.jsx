import React, { useContext } from "react";
import { myContext } from "../context/StoreContext";

const Footer = () => {
  const { assets } = useContext(myContext);
  return (
    <div className="w-[80%] m-auto pb-12">
      <div className="grid sm:grid-cols-[3fr_1fr_1fr] sm:gap-4 gap-2 mb-8">
        <div className="flex flex-col gap-1">
          <img
            src={assets.logo}
            className="w-[120px] sm:w-[90px] md:w-[120px] h-[40px] mb-3 mt-4"
          />
          <p className="text-gray-500 sm:w-[90%]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
            adipisci velit distinctio voluptatem qui alias! Nihil eaque, fuga
            deserunt quasi.
          </p>
        </div>
        <div>
          <h2 className="mb-3 mt-4 font-bold">COMPANY</h2>
          <ul className="text-gray-500">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 mt-4 font-bold">GET IN TOUCH</h2>
          <ul className="text-gray-500">
            <li>+456787654</li>
            <li>vdjsl@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="h-0.5 border-0 bg-gray-500" />
      <p className="text-center mt-5">
        Copyright 2025@ ytt.com - All rights Reserved.
      </p>
    </div>
  );
};

export default Footer;

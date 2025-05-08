import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row  border border-gray-400 gap-6 mt-4 mb-16">
      <div className="flex flex-col gap-2  sm:w-1/2 items-center justify-center py-5 sm:py-0">
        <p className="font-semibold">OUR BEST SELLERS</p>
        <h1 className="prata-regular text-2xl sm:text-3xl">Latest Arrivals</h1>
        <p className="font-semibold ">SHOP NOW</p>
      </div>
      <img className=" sm:w-1/2 h-auto" src={assets.hero_img} alt="" />
    </div>
  );
};

export default Hero;

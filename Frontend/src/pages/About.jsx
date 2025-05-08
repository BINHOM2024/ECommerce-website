import React, { useContext } from "react";
import { myContext } from "../context/StoreContext";

const About = () => {
  const { assets } = useContext(myContext);
  return (
    <div className="border-t border-gray-400 pt-8 w-[80%] m-auto mb-20">
      <h2 className="prata-regular text-center font-medium text-2xl mb-8">
        ABOUT US
      </h2>
      <div className="grid sm:grid-cols-2 gap-8 items-center">
        <img src={assets.about_img} className="" />
        <div className="flex flex-col gap-2">
        
          <p className="text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            ipsa tempora nisi magni repudiandae corrupti incidunt? Similique
            nostrum minus doloribus?
          </p>
          <h3 className="font-medium py-2">Our Mission</h3>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quis
            excepturi incidunt aliquam animi veritatis officiis tempora, odit
            hic et. Quas quibusdam, voluptatum libero dolorem deleniti
            aspernatur ab recusandae ipsa!
          </p>
        </div>
      </div>
      <h2 className="mt-16 mb-4 text-center font-medium text-2xl">WHY CHOOSE US?</h2>
      <div className="grid sm:grid-cols-3">
        <div className="flex flex-col  border border-gray-400 py-6 px-3 gap-2">
          <p className="font-black">Quality Assurance:</p>
          <p>
            Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
            consectetur.
          </p>
        </div>
        <div className="flex flex-col  border border-gray-400 py-6 px-3 gap-2">
          <p className="font-black">Convenience:</p>
          <p>
            Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
            consectetur.
          </p>
        </div>
        <div className="flex flex-col  border border-gray-400 py-6 px-3 gap-2">
          <p className="font-black">Exceptional Customer Service:</p>
          <p>
            Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
            consectetur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

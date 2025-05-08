import React, { useContext } from 'react'
import { myContext } from '../context/StoreContext'

const Contact = () => {
  const { assets } = useContext(myContext);
  return (
    <div className="w-[80%] m-auto border-t pt-12 mb-12">
      <h2 className="font-medium text-2xl text-center">CONTACT US</h2>
      <div className="flex flex-col sm:flex-row gap-8 sm:items-center sm:place-self-center mt-4">
        <img
          src={assets.contact_img}
          className="w-[100%] sm:w-[300px] md:w-[400px]"
        />
        <div className="flex flex-col gap-2 w-[100%]">
          <p className="font-bold text-[18px]">Our Store</p>
          <div className="text-gray-500">
            <p>makindye state</p>
            <p>kampala,uganda</p>
          </div>
          <div className="text-gray-500">
            <p>Tel:56789009</p>
            <p>Email:dummy@gmail.com</p>
          </div>
          <p className="font-bold text-[18px]">Careers at Forever</p>
          <p className="text-gray-500">Learn more about our team</p>
          <button className='bg-black text-white py-2 px-3 rounded-[4px] hover:bg-gray-700 place-self-start'>Explore Us</button>
        </div>
      </div>
    </div>
  );
}

export default Contact
import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import { myContext } from '../context/StoreContext';

const ProductsItem = ({ item }) => {
  const {currency}=useContext(myContext)
  return (
    <div>
      <div className="cursor-pointer flex flex-col gap-1">
        <Link to={`/product/${item._id}`}>
          <img
            src={item.image[0]}
            className="hover:scale-105  ease-in-out overflow-hidden"
          />
        </Link>
        <p className="text-gray-500">{item.name}</p>
        <p>{ currency}{item.price}</p>
      </div>
    </div>
  );
}

export default ProductsItem
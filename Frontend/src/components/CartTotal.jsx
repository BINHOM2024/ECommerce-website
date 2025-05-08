import React, { useContext } from 'react'
import { myContext } from '../context/StoreContext';

const CartTotal = () => {
    const { delivery_fee, getTotalCartAmount,currency } = useContext(myContext);
  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="font-medium text-2xl">CART TOTALS</h2>
      <div className="flex flex-col ">
        <div className="flex justify-between  border-b-2 border-gray-300 pb-2">
          <p>Subtotal</p>
          <p>
            {currency}
            {getTotalCartAmount()}
          </p>
        </div>
        <div className="flex justify-between  border-b-2 border-gray-300 py-2">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {getTotalCartAmount() > 0 ? delivery_fee : 0}
          </p>
        </div>
        <div className="flex justify-between  border-b-2 border-gray-300 py-2">
          <p className="font-bold">Total</p>
          <p className="font-bold">
            {currency}
            {getTotalCartAmount() > 0 ? getTotalCartAmount() + delivery_fee : 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartTotal
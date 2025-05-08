import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../context/StoreContext";
import CartTotal from "../components/cartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    token,
    assets,
    updateCart,navigateTo
  } = useContext(myContext);
  const [cartData, setCartData] = useState([]);

  const cart = () => {
    const data = [];
    for (let items in cartItems) {
      for (let item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          data.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(data);
  };

 const onChangeHandler=(id,size,e) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      updateCart(id,size, value);
    }
  }
  
  useEffect(() => {
    cart();
  }, [cartItems]);

  return (
    <div className="border-t border-gray-400 pt-12 w-[80%] m-auto mb-16">
      <h2 className="font-bold text-2xl">YOUR CART</h2>
      <div className="grid mt-8">
        {cartData.map((item, index) => {
          let productCart = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="border-t border-b border-gray-400 grid grid-cols-[1fr_3fr] sm:grid-cols-[1fr_3fr_1fr_.5fr] gap-2 items-center py-2"
            >
              <img src={productCart.image[0]} className="w-16" />
              <div>
                <p className="font-medium">{productCart.name}</p>
                <div className="flex gap-2">
                  <p>
                    {currency}
                    {productCart.price}
                  </p>
                  <p className="bg-gray-300 px-2 border-gray-400 border-2">
                    {item.size}
                  </p>
                </div>
              </div>
              <input
                onChange={(e) => onChangeHandler(item._id, item.size, e)}
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="border-2 border-gray-300 outline-0 px-1 py-0.5 w-14 "
              />
              <img
                src={assets.bin_icon}
                className="w-4 cursor-pointer"
                onClick={() => updateCart(item._id, item.size, 0)}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-16 sm:place-self-end w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%]">
        <CartTotal />
        <button onClick={()=>navigateTo("/place_order")} className="bg-black text-white py-3 sm:py-3 sm:px-4 px-3 rounded-br-3xl cursor-pointer active:bg-gray-700 rounded-tl-3xl mt-6">
          GO TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;

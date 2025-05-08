import React, { useContext, useState } from "react";
import CartTotal from "../components/cartTotal";
import { myContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    assets,
    navigateTo,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    backendUrl,
    token,
    products,
    delivery_fee,
  } = useContext(myContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [method, setMethod] = useState("cod");

  const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((current) => ({ ...current, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (let items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + delivery_fee,
      };
      let route = backendUrl + "/api/orders";
      switch (method) {
        case "stripe":
          route += "/stripe";
          break;
        default:
          route += "/cod";
          navigateTo("/orders");
          setCartItems({});
          break;
      }

      const response = await axios.post(
        route,
        { orderData },
        { headers: { token } }
      );
      if (response.data.success) {
        if (method === "stripe") {
          const { session_url } = response.data;
          window.location.replace(session_url);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-8 md:gap-14 lg:gap-52 mb-12 border-t pt-8 w-[80%] m-auto"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl pb-3">Delivery Information</h2>
        <div className="flex gap-2 ">
          <input
            className="border-2 outline-0 w-full border-gray-300 px-2 py-1 text-[17px] rounded-[4px]"
            required
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="first name"
          />
          <input
            className="border-2 w-full outline-0 border-gray-300 px-2 py-1 text-[17px] rounded-[4px]"
            required
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="last name"
          />
        </div>
        <input
          className="border-2 outline-0 border-gray-300 px-2 py-1 text-[17px] rounded-[4px]"
          required
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="email address"
        />
        <input
          className="border-2 outline-0 border-gray-300 px-2 py-1 text-[17px] rounded-[4px]"
          required
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="street"
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              className="border-2 w-full outline-0 border-gray-300 px-2 py-1 text-[17px] rounded-[4px]"
              required
              type="text"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              placeholder="city"
            />
            <input
              className="border-2 w-full outline-0 border-gray-300 px-2 py-1 text-[17px] rounded-[4px]"
              required
              type="text"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              placeholder="state"
            />
          </div>
          <div className="flex gap-2">
            <input
              className="border-2 w-full outline-0 border-gray-300 px-2 py-1 text-[17px] rounded-[4px]"
              required
              type="text"
              name="zipCode"
              onChange={onChangeHandler}
              value={data.zipCode}
              placeholder="zip code"
            />
            <input
              className="border-2 w-full outline-0 border-gray-300 px-2 py-1 text-[17px] rounded-[4px]"
              required
              type="text"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              placeholder="country"
            />
          </div>
        </div>
        <input
          className="border-2 outline-0 border-gray-300 px-2 py-1 text-[17px] rounded-[4px]"
          required
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="phone"
        />
      </div>
      <div className=" w-[80%] sm:w-[100%] sm:mt-12 md:w-[60%] lg:w-[50%]">
        <CartTotal />
        <div className="mt-6 flex flex-col gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          <div
            onClick={() => setMethod("stripe")}
            className="max-w-50 cursor-pointer border-2 border-gray-400 rounded-[4px] py-1 px-4 lg:px-1 flex items-center gap-2"
          >
            <p
              className={`min-w-3.5 h-3.5 rounded-2xl border border-gray-200 ${
                method === "stripe" && "bg-green-400"
              }`}
            ></p>
            <img src={assets.stripe_logo} className="w-14" />
          </div>
          <div
            onClick={() => setMethod("cod")}
            className="max-w-50 cursor-pointer border-2 border-gray-400 rounded-[4px] py-1 px-4 sm:pl-2 sm:pr-0 flex items-center gap-2"
          >
            <p
              className={`min-w-3.5 h-3.5 rounded-2xl border border-gray-200 ${
                method === "cod" && "bg-green-400"
              }`}
            ></p>
            <p className="text-[14px]">Cash on Delivery</p>
          </div>
          <button className="bg-black text-white py-3 sm:py-2 sm:text-[14px] sm:px-2 px-3 rounded-br-3xl cursor-pointer active:bg-gray-700 rounded-tl-3xl mt-6 sm:mt-0 max-w-50">
            GO TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

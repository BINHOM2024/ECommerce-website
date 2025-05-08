import React, { createContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";

export const myContext = createContext();
const StoreContext = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigateTo = useNavigate();

  const delivery_fee = 10;
  const currency = "$";

  const addToCart = async (itemId, size) => {
    if (!size) return toast.error("Please select a size.");
    if (!token) return toast.error("login first please!");

    let cartData = structuredClone(cartItems);
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/userCart/add`,
          { itemId, size },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, sizes) =>
        total + Object.values(sizes).reduce((sum, count) => sum + count, 0),
      0
    );
  };
  const updateCart = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/userCart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        } else return toast.error(response.data.message);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const getUserCarts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/userCart/get`, {
        headers: { token },
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else return toast.error(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const productAmount = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item]) {
          totalAmount += productAmount.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  const getAllproducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllproducts();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCarts();
    }
  }, [token]);

  const value = {
    products,
    delivery_fee,
    currency,
    assets,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateCart,
    getTotalCartAmount,
    navigateTo,
    backendUrl,
    token,
    setToken,
  };

  return <myContext.Provider value={value}>{children}</myContext.Provider>;
};

export default StoreContext;

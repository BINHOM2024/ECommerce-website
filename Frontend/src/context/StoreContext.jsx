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

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [productsRes, cartRes] = await Promise.all([
          axios.get(`${backendUrl}/api/product/list`),
          token
            ? axios.get(`${backendUrl}/api/userCart/get`, {
                headers: { token },
              })
            : Promise.resolve({ data: { success: true, cartData: {} } }),
        ]);

        if (productsRes.data.success) {
          setProducts(productsRes.data.products);
        } else {
          toast.error(productsRes.data.message);
        }

        if (cartRes.data.success) {
          setCartItems(cartRes.data.cartData);
        } else {
          toast.error(cartRes.data.message);
        }
      } catch (err) {
        toast.error(err.message);
      } 
    };

    fetchInitialData();
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

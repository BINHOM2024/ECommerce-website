import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { myContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const Verify = () => {
  const { backendUrl, token, setCartItems, navigateTo } = useContext(myContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyStripe = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/orders/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        navigateTo("/orders");
      } else {
        navigateTo("/cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    verifyStripe();
  }, [token]);

  return <div>Verify</div>;
};

export default Verify;

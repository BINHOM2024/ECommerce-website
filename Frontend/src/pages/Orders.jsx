import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const { backendUrl, currency,token } = useContext(myContext)
  const [orderData, setOrderData] = useState([])

  const getUserOrder = async () => {
    if (!token) return
    
  try {
      const response = await axios.post(
        `${backendUrl}/api/orders/userOrders/`,
        {},
        { headers: { token } }
    );

if (response.data.success) {
  let allOrders = [];

  response.data.orders.map((order) => {
    order.items.forEach((item) => {
      item["status"] = order.status;
      item["payment"] = order.payment;
      item["paymentMethod"] = order.paymentMethod;
      item["date"] = order.date;

      allOrders.push(item);
    });
  });

  setOrderData(allOrders);
}


  } catch (error) {
    toast.error(error.message)
  }
  }
  useEffect(() => {
    getUserOrder()
  }, [token])
  
  return (
    <div className="border-t border-gray-400 w-[80%] m-auto pt-12 mb-10">
      <h2 className="font-medium text-2xl">MY ORDERS</h2>
      <div className="mt-2 mb-20">
        {orderData.map((item) => (
          <div
            className="grid gap-3 grid-cols-[1fr_3fr]  sm:grid-cols-[1fr_3fr_1fr_1fr] border-b border-t border-gray-400 py-2  items-center "
            key={item._id}
          >
            <img src={item.image[0]} className="w-20" />
            <div className="flex flex-col gap-1">
              <p>{item.name}</p>
              <div className="flex gap-2 text-gray-400">
                <p className="text-black">
                  {currency}
                  {item.price}
                </p>
                <p>
                  <span className="text-black">Quantity: </span>
                  {item.quantity}
                </p>
                <p>
                  <span className="text-black">Size: </span> {item.size}
                </p>
              </div>
              <p className="text-gray-400">
                <span className="text-black">Date: </span>{" "}
                {new Date(item.date).toDateString()}
              </p>
              <p className="text-gray-400">
                <span className="text-black">payment: </span>{" "}
                {item.paymentMethod}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="min-w-3 h-3 bg-green-400 rounded-full"></p>
              <p>{item.status}</p>
            </div>
            <button
              onClick={getUserOrder}
              className="border border-gray-400 py-1 rounded-[4px] max-w-[30%] sm:max-w-full"
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders
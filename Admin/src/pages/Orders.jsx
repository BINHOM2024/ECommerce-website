
import axios from "axios"
import { backendUrl, currency } from '../App'
import { useState,useEffect } from 'react'
import {toast} from "react-toastify"
import { assets } from "../assets/assets"

const Orders = ({token}) => {
const [orders, setOrders] = useState([])
  const getAllOrders = async () => {
  try {
     if (!token) return;

     const response = await axios.post(
       `${backendUrl}/api/orders/list`,
       {},
       { headers: { token } } 
     );
     if (response.data.success) {
       setOrders(response.data.orders.reverse());
     } 
  } catch (error) {
    toast.error(error.message)
  }
  }

  const onChangeHandler = async (event,orderId) => {
    const status = event.target.value;
   try {
     if (!toast) return;

     const response = await axios.post(
       `${backendUrl}/api/orders/update`,
       { orderId, status },
       { headers: { token } }
     );
     if (response.data.success) {
       await getAllOrders();
       toast.success(response.data.message)
     }
   } catch (error) {
    toast.error(error.message)
   }
}

  useEffect(() => {
    getAllOrders()
  }, [token])

  return (
    <div className="flex flex-col gap-4 mt-">
      <h2 className="text-[23px]">Order Page</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          className="grid sm:grid-cols-[2fr_3fr]  lg:grid-cols-[1fr_3fr_2fr_2fr] gap-2 text-gray-400 border border-gray-300 p-2"
        >
          <img src={assets.parcel_icon} alt="" />

          {order.items.map((item) => (
            <div key={item._id}>
              <div>
                <p>{item.name}</p>
                <p className="font-bold text-black">
                  {order.address.firstName}
                </p>
              </div>
              <div>
                <p>items: {order.items.length}</p>
              </div>
            </div>
          ))}
          <div>
            <p>Method: {order.paymentMethod}</p>
            <p>Payment: {order.payment ? "Done" : "pending"}</p>
            <p>Date: {new Date(order.date).toDateString()}</p>
          </div>
          <div>
            <p className="text-black">
              {currency}
              {order.amount}
            </p>
            <select
              className="text-black border-2 border-gray-400 px-1 py-2"
              onChange={(e) => onChangeHandler(e, order._id)}
              value={order.status}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders
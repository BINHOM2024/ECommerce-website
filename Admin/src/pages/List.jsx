import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";


const List = ({token}) => {
  const [lists, setLists] = useState([]);

  const fetchLists = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setLists(response.data.products);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove/${id}`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        fetchLists()
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-[20px] font-medium mb-2">Products List</h2>
      <div className="hidden sm:grid sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 bg-gray-100 py-2 pl-1">
        <b>image</b>
        <b className="text-center">name</b>
        <b>category</b>
        <b className="text-center">price</b>
        <b>action</b>
      </div>
      {lists.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_3fr_1fr] gap-2 items-center text-gray-400 sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] border-2 p-1 border-gray-300"
        >
          <img src={item.image[0]} className="w-12" />
          <p>{item.name}</p>
          <p className="text-center">{item.category}</p>
          <p className="text-center">
            {currency}
            {item.price}
          </p>
          <p
            onClick={() => removeProduct(item._id)}
            className="text-center cursor-pointer "
          >
            X
          </p>
        </div>
      ))}
    </div>
  );
};

export default List;

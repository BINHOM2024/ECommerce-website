import React, { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
const Login = ({ setToken }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onsubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        data,
      });
        const adminToken = response.data.token;
      if (response.data.success) {
          setToken(adminToken);
          localStorage.setItem("token",adminToken );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center  justify-center bg-gray-50 h-screen px-2">
      <div className=" shadow-md w-92 items-center p-8 rounded-md bg-white">
        <h1 className="font-bold text-2xl mb-4">Admin Panel</h1>
        <form className="flex flex-col gap-4" onSubmit={onsubmitHandler}>
          <div>
            <p className="text-sm font-medium pb-1">Email Address</p>
            <input
              onChange={(e) =>
                setData((current) => ({ ...current, email: e.target.value }))
              }
              className="border w-full border-gray-300 px-2 py-1.5 rounded-md outline-0"
              type="email"
              placeholder="your email"
              required
            />
          </div>
          <div>
            <p className="text-sm font-medium pb-1">Password</p>
            <input
              onChange={(e) =>
                setData((current) => ({ ...current, password: e.target.value }))
              }
              className="border w-full border-gray-300 px-2 py-1.5 rounded-md outline-0"
              type="password"
              placeholder="your password"
              required
            />
          </div>
          <button className="w-full mt-1 bg-black text-white py-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

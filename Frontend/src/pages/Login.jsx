import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { backendUrl, token, setToken, navigateTo } = useContext(myContext);
  const [currentStatus, setCurrentStatus] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((current) => ({ ...current, [name]: value }));
  };

  const login = (e) => {
    e.preventDefault();
    let storeUrl = backendUrl;
    if (currentStatus === "Sign Up") {
      storeUrl += "/api/user/register";
    } else {
      storeUrl += "/api/user/login";
    }
    axios
      .post(storeUrl, { data })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
        } else {
          toast(response.data.message);
        }
      })
      .catch((error) =>
        toast(error.message || "something went wrong")
      );
  };

  useEffect(() => {
    if (token) {
      navigateTo("/");
    }
  }, [token]);

  return (
    <div className="border-t border-gray-400 py-8 w-[80%] m-auto mb-12">
      <form
        className="flex flex-col gap-2 place-self-center w-[80%] sm:w-[60%] lg:w-[40%]"
        onSubmit={login}
      >
        <h2 className="prata-regular font-medium text-2xl text-center mb-2">
          {currentStatus}
        </h2>
        <div className="flex flex-col gap-3">
          {currentStatus === "Sign Up" ? (
            <input
              className="border-2 outline-0  p-2 border-gray-300 rounded-[4px]"
              type="text"
              placeholder="your name"
              onChange={onChangeHandler}
              name="name"
              value={data.name}
              required
            />
          ) : (
            <></>
          )}
          <input
            className="border-2 outline-0 p-2 border-gray-300 rounded-[4px]"
            type="email"
            placeholder="email"
            onChange={onChangeHandler}
            name="email"
            value={data.email}
            required
          />
          <input
            className="border-2 outline-0  p-2 border-gray-300 rounded-[4px]"
            type="password"
            placeholder="password"
            onChange={onChangeHandler}
            name="password"
            value={data.password}
            required
          />
        </div>

        <div className="flex justify-between mt-4">
          <p className=" cursor-pointer">forgot password?</p>
          {currentStatus === "Sign Up" ? (
            <span
              onClick={() => setCurrentStatus("Login")}
              className="text-gray-500 underline cursor-pointer"
            >
              login here
            </span>
          ) : (
            <span
              className="text-gray-500 underline cursor-pointer"
              onClick={() => setCurrentStatus("Sign Up")}
            >
              Create Account
            </span>
          )}
        </div>
        <button className="text-2xl bg-black text-white place-self-center py-2 w-30 sm:w-[35%] rounded-[4px] mt-6">
          {currentStatus}
        </button>
      </form>
    </div>
  );
};

export default Login;

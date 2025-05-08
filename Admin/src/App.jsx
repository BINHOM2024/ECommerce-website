import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer} from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency="$"
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />) : (
        <div className="flex flex-col w-[90%] m-auto my-6">
          <Navbar setToken={setToken}/>
          <hr className="border border-gray-300" />
          <div className="flex gap-6">
            <div className="min-w-[20%] h-screen border-r-2 pt-4 border-gray-300">
              <Sidebar />
            </div>
            <div className="pt-2 w-full">
              <Routes>
                  <Route path="/add" element={<Add token={ token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;

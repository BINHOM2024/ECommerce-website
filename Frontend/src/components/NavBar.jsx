import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { myContext } from "../context/StoreContext";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigateTo,
    token,
    setToken,
    setCartItems,
  } = useContext(myContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigateTo("/login")
  };

  return (
    <div className="flex justify-between py-8 w-[80%] m-auto align-middle text-[21px]">
      <Link to="/">
        <img
          src={assets.logo}
          className="w-[120px] sm:w-[90px] md:w-[120px] h-[40px]"
        />
      </Link>
      <ul className="gap-2 md:gap-6 hidden sm:flex">
        <NavLink to="/">
          <p>Home</p>
        </NavLink>
        <NavLink to="/collection">
          <p>Collection</p>
        </NavLink>
        <NavLink to="/about">
          <p>About</p>
        </NavLink>
        <NavLink to="/contact">
          <p>Contact</p>
        </NavLink>
      </ul>
      <div className="flex gap-4 sm:gap-2 md:gap-5">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-6 h-6 cursor-pointer"
        />
        <div className="group relative">
          <img
            onClick={() =>token?null: navigateTo("/login")}
            src={assets.profile_icon}
            className="w-6 min-w-5 h-6 cursor-pointer"
          />
          {token && (
            <div className="group-hover:block hidden  absolute right-0  p-4 text-[16px] text-gray-500 w-[120px] mt-3 bg-blue-100 font-bold">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={()=>navigateTo("/orders")} className="cursor-pointer hover:text-black leading-7">
                Orders
              </p>
              <p onClick={logout} className="cursor-pointer hover:text-black">
                Logout
              </p>
            </div>
          )}
        </div>
        <Link to="/cart" className="cursor-pointer relative">
          <img src={assets.cart_icon} className="w-6 min-w-5 h-6" />
          <p className="absolute w-4 h-4 rounded-full bg-black text-[13px] text-center text-white right-[-6px] bottom-[10px] leading-4">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 h-5 sm:hidden cursor-pointer"
        />
      </div>
      <div
        className={` absolute top-0 bottom-0 py-8  right-0 bg-gray-50 ${
          visible ? "w-full" : "hidden"
        }`}
      >
        <div
          className="flex items-center gap-2 cursor-pointer w-10 pl-6"
          onClick={() => setVisible(false)}
        >
          <img className="w-4 h-6" src={assets.dropdown_icon} />
          <p>Back</p>
        </div>
        <div className="flex flex-col mt-8 text-[18px] text-gray-400">
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className="border border-gray-300 pl-6 py-1 hover:text-black"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className="border border-gray-300 pl-6 py-1 hover:text-black"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className="border border-gray-300 pl-6 py-1 hover:text-black"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className="border border-gray-300 pl-6 py-1 hover:text-black"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

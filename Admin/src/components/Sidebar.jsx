import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
const Sidebar = () => {
  return (
    <div className="flex flex-col gap-3 ">
      <NavLink
        to="/add"
        className="flex items-center gap-2 pl-2 py-1.5 lg:py-3 lg:pl-3 border-2 rounded-l border-r-0 border-gray-300 "
      >
        <img src={assets.add_icon} className="w-5" />
        <p className="hidden sm:block">Add Items</p>
      </NavLink>
      <NavLink
        to="/list"
        className="flex items-center gap-2 pl-2 py-1.5  lg:py-3 lg:pl-3 border-2 rounded-l border-r-0 border-gray-300 "
      >
        <img src={assets.order_icon} className="w-5" />
        <p className="hidden sm:block">List Item</p>
      </NavLink>
      <NavLink
        to="/orders"
        className="flex items-center gap-2 pl-2 py-1.5  lg:py-3 lg:pl-3 border-2 rounded-l border-r-0 border-gray-300 "
      >
        <img src={assets.order_icon} className="w-5" />
        <p className="hidden sm:block">Orders</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;

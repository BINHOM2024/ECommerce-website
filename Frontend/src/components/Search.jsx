import { useContext, useEffect, useState } from "react";
import { myContext } from "../context/StoreContext";
import { useLocation } from "react-router-dom";

const Search = () => {
  const { search, setSearch, showSearch, setShowSearch, assets } =
    useContext(myContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b border-gray-300 bg-gray-100 w-[80%] m-auto flex gap-3 items-center justify-center">
      <div className="flex border my-4 px-3 py-1 rounded-2xl items-center  w-[60%]">
        <input
          type="text"
          className="flex-1 outline-0 w-[70%]"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search_icon} className="w-4 h-4 cursor-pointer" />
      </div>
      <img
        src={assets.cross_icon}
        className="w-4 h-4 cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
};

export default Search;

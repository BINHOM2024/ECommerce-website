import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../context/StoreContext";
import ProductsItem from "../components/ProductsItem";

const Collection = () => {
  const { assets,search,products,showSearch } = useContext(myContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterPdoduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [filterType, setFilterType] = useState("Relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((current) =>
        current.filter((item) => item !== e.target.value)
      );
    } else {
      setCategory((current) => [...current, e.target.value]);
    }
  };

    const toggleSubCategory = (e) => {
      if (subCategory.includes(e.target.value)) {
        setSubCategory((current) =>
          current.filter((item) => item !== e.target.value)
        );
      } else {
        setSubCategory((current) => [...current, e.target.value]);
      }
  };

  const filterProducts = () => {
    let productCopy = products.slice();
    if (showSearch && search) {
      productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productCopy=productCopy.filter(item=>category.includes(item.category))
    }
    if (subCategory.length > 0) {
       productCopy = productCopy.filter((item) =>
         subCategory.includes(item.subCategory)
       );
    }
      setFilterProduct(productCopy);
}

  const filterbyPrice = () => {
    let filterByPCopy = filterPdoduct.slice();
switch (filterType) {
  case "high-low":
    setFilterProduct(filterByPCopy.sort((a, b) => b.price - a.price));
    break;
  case "low-high":
    setFilterProduct(filterByPCopy.sort((a, b) => a.price - b.price));
    break;
  default:
    filterProducts();
    break;
}
  }

   useEffect(() => {
     filterProducts()
   }, [category, subCategory,search,showSearch,products]);
  
   useEffect(() => {
     filterbyPrice();
   }, [filterType]);
 
  return (
    <div className="w-[80%] m-auto pb-20 flex flex-col sm:flex-row gap-8 border-t border-gray-400 pt-12">
      <div className="flex flex-col gap-4 w-52 md:w-60">
        <h2
          className="text-gray-800 cursor-pointer font-bold text-[23px] pb-3 flex items-center gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`w-3 h-4 sm:hidden z-[-1] ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </h2>
        <div
          className={`border pl-3 py-2 border-gray-400 flex flex-col rounded-[2px]  md:gap-2 ${
            showFilter ? "" : "hidden"
          } sm:flex`}
        >
          <p className="font-bold pb-1  md:pb-0">CATEGORIES</p>
          <label
            className="flex gap-1 text-gray-500 cursor-pointer"
            htmlFor="men"
          >
            <input
              type="checkbox"
              id="men"
              value={"Men"}
              onChange={toggleCategory}
            />
            Men
          </label>
          <label
            className="flex gap-1 text-gray-500 cursor-pointer"
            htmlFor="women"
          >
            <input
              type="checkbox"
              id="women"
              value={"Women"}
              onChange={toggleCategory}
            />
            Women
          </label>
          <label
            className="flex gap-1 text-gray-500 cursor-pointer"
            htmlFor="kids"
          >
            <input
              type="checkbox"
              id="kids"
              value={"Kids"}
              onChange={toggleCategory}
            />
            Kids
          </label>
        </div>
        <div
          className={`border pl-3 py-2 border-gray-400 flex flex-col rounded-[2px]  md:gap-2 ${
            showFilter ? "" : "hidden"
          } sm:flex`}
        >
          <p className="font-bold pb-1 md:pb-0">TYPE</p>
          <label
            className="flex gap-1 text-gray-500 cursor-pointer"
            htmlFor="top-wear"
          >
            <input
              type="checkbox"
              id="top-wear"
              value={"Topwear"}
              onChange={toggleSubCategory}
            />
            Topwear
          </label>
          <label
            className="flex gap-1 text-gray-500 cursor-pointer"
            htmlFor="bottom-wear"
          >
            <input
              type="checkbox"
              id="bottom-wear"
              value={"Bottomwear"}
              onChange={toggleSubCategory}
            />
            Bottomwear
          </label>
          <label
            className="flex gap-1 text-gray-500 cursor-pointer"
            htmlFor="winter-wear"
          >
            <input
              type="checkbox"
              id="winter-wear"
              value={"Winterwear"}
              onChange={toggleSubCategory}
            />
            Winterwear
          </label>
        </div>
      </div>
      <div className=" flex-1">
        <div className=" flex justify-between pb-5 items-center gap-1">
          <h2 className="text-[18px] sm:text-2xl">All Collections</h2>
          <select
            className=" border-2 border-gray-400 outline-0 p-1 font-bold md:p-2"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="Relavent">sort by: Relavent</option>
            <option value="high-low">sort by: high-low</option>
            <option value="low-high">sort by: low-high</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {filterPdoduct.map((item) => (
            <ProductsItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

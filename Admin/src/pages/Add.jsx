import { useState } from "react";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const Add = ({ token }) => {
  const productSizes = ["S", "M", "L", "XL", "XXL"];
  const [images, setImages] = useState(["", "", "", ""]);

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Men",
    subCategory: "Topwear",
    price: null,
    sizes: [],
    bestSeller: false,
  });

  const onChangeHandler = (e) => {
    const { name, value, checked, type } = e.target;
    setData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    const size = e.target.value;
    setData((current) => ({
      ...current,
      sizes: data.sizes.includes(size)
        ? data.sizes.filter((s) => s !== size)
        : [...current.sizes, size],
    }));
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if(!images) return "select an image please."
      const formData = new FormData();
      images.map(img => (
        formData.append("images",img)
      ))
      for (const [key,value] of Object.entries(data)) {
       formData.append(key,value)
      }
     
      const response = await axios.post(
        `${backendUrl}/api/product/add`,
         formData ,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleImageChange = (index, newImage) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = newImage;
      return updatedImages;
    });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-4 mt-2 sm:pl-8 max-w-[80%]"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <label htmlFor="image1">
          <img
            src={
              images[0] ? URL.createObjectURL(images[0]) : assets.upload_area
            }
          />
          <input
            onChange={(e) => handleImageChange(0, e.target.files[0])}
            type="file"
            id="image1"
            hidden
          />
        </label>
        <label htmlFor="image2">
          <img
            src={
              images[1] ? URL.createObjectURL(images[1]) : assets.upload_area
            }
          />
          <input
            onChange={(e) => handleImageChange(1, e.target.files[0])}
            type="file"
            id="image2"
            hidden
          />
        </label>
        <label htmlFor="image3">
          <img
            src={
              images[2] ? URL.createObjectURL(images[2]) : assets.upload_area
            }
          />
          <input
            onChange={(e) => handleImageChange(2, e.target.files[0])}
            type="file"
            id="image3"
            hidden
          />
        </label>
        <label htmlFor="image4">
          <img
            src={
              images[3] ? URL.createObjectURL(images[3]) : assets.upload_area
            }
          />
          <input
            onChange={(e) => handleImageChange(3, e.target.files[0])}
            type="file"
            id="image4"
            hidden
          />
        </label>
      </div>
      <div>
        <p className="mb-2">Product name</p>
        <input
          onChange={onChangeHandler}
          name="name"
          className="border border-gray-300 py-1 px-2 rounded-md w-full sm:py-2"
          type="text"
          placeholder="type here"
          required
        />
      </div>
      <div>
        <p className="mb-2">Product description</p>
        <textarea
          onChange={onChangeHandler}
          name="description"
          className="w-full border border-gray-300 py-1 px-2 rounded-md"
          placeholder=" write comment here..."
        ></textarea>
      </div>
      <div className="flex flex-col sm:items-center sm:flex-row gap-3">
        <div>
          <p className="mb-2"> Category</p>
          <select
            onChange={onChangeHandler}
            name="category"
            className="border border-gray-300 py-2 px-2 rounded-md w-full sm:w-auto"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={onChangeHandler}
            name="subCategory"
            className="border border-gray-300 py-2 px-2 rounded-md w-full sm:w-auto"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2"> Price</p>
          <input
            onChange={onChangeHandler}
            name="price"
            className="w-full border border-gray-300 py-2 px-2 rounded-md"
            type="number"
            placeholder="12"
            required
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-2">
          {productSizes.map((size, index) => (
            <button
              value={size}
              onClick={onClickHandler}
              key={index}
              className={`${
                data.sizes.includes(size) ? "bg-red-200" : "bg-slate-200"
              } px-2 text-[14px] sm:text-[16px] cursor-pointer`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-1.5 ">
        <input
          onChange={onChangeHandler}
          name="bestSeller"
          type="checkbox"
          id="bestseller"
          checked={data.bestSeller}
          className="cursor-pointer"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button className="bg-black text-white p-2 rounded-md w-34">ADD</button>
    </form>
  );
};

export default Add;

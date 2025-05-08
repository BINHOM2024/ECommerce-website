import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { myContext } from "../context/StoreContext";
import RelatedProducts from "../components/RelatedProducts";
const Product = () => {
  const { products, currency, addToCart } = useContext(myContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const getProduct = () => {
    products.map((item) => {
      if (productId === item._id) {
        setProductData(item);
        setImage(item.image[0]);
      }
      return null;
    });
  };

  useEffect(() => {
    getProduct();
  }, [productId, products]);

  return productData ? (
    <div className="fle flex-col w-[80%]  m-auto my-6">
      <div className=" flex flex-col gap-10 sm:flex-row sm:gap-6">
        <div className="flex flex-col sm:flex-row gap-2 ">
          <div className="flex  sm:flex-col  sm:w-[35%] gap-5 overflow-x-scroll sm:gap-2 sm:overflow-y-auto sm:h-[50vh]">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                className=" cursor-pointer w-[35%] sm:w-[100%]"
                src={item}
                key={index}
              />
            ))}
          </div>
          <div className="">
            <img className="w-full sm:h-[60vh] cursor-pointer" src={image} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-medium">{productData.name}</h2>
          <p className="text-2xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="text-gray-500">{productData.description}</p>
          <div className="flex flex-col gap-3 items-start">
            <p className="font-medium">Select Size</p>
            <div className="flex">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`mr-2 px-4 py-2 bg-gray-200 cursor-pointer ${
                    item === size ? "border-2 border-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={() => addToCart(productData._id, size)}
              className="bg-black text-white py-2 px-3 rounded my-4 active:bg-gray-700 cursor-pointer"
            >
              Add To Cart
            </button>
          </div>
          <hr />
          <div className="text-gray-500">
            <p>100% Original product</p>
            <p>cash on delivery is available</p>
            <p>easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default Product;

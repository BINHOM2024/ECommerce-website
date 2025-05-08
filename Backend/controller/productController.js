import { json } from "express";
import productModel from "../models/productModel.js";
import {v2 as cloudinary} from "cloudinary"

const addProduct = async (req, res) => {
  const { name, description, category, subCategory, price, sizes, bestSeller } = req.body;
  try {
     const imageUrls =await Promise.all(
    req.files.map(async(item) => {
      const result = await cloudinary.uploader.upload(item.path)
      return {
        url: result.secure_url,
        public_id:result.public_id
      }
     })
    );
    const products = {
      name,
      description,
      category,
      subCategory,
      price:Number(price),
      sizes:sizes.split(","),
      bestSeller:bestSeller==="true"?true:false,
      image: imageUrls.map(item=>item.url),
      date: Date.now()
    };
    const newProduct = new productModel(products);
    await newProduct.save();
    res.json({ success: true, message: "product added" });
  } catch (error) {
     res.json({ success: false, message: "error => :" + error });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const remove = await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "product removed" });
  } catch (error) {
    res.json({ success: false, message: "error => :" + error });
  }
};

const ProductsList = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: "error =>: " + error });
  }
};

const singleProduct = async () => {};

export { addProduct, removeProduct, ProductsList, singleProduct };


import express from "express"
import { addProduct, ProductsList, removeProduct, singleProduct } from "../controller/productController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.array("images",4),
  adminAuth,
  addProduct
);
productRouter.post("/remove/:id",adminAuth,removeProduct)
productRouter.get("/list",ProductsList)
productRouter.get("/single", singleProduct)

export default productRouter;
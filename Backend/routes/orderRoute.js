import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  allOrders,
  placeOrderCOD,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
} from "../controller/orderController.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

//payment methods
orderRouter.post("/cod", userAuth, placeOrderCOD);
orderRouter.post("/stripe", userAuth, placeOrderStripe);

//verify paymennt
orderRouter.post("/verifyStripe",userAuth,verifyStripe);

//admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/update", adminAuth, updateStatus);
 
//user order
orderRouter.post("/userOrders", userAuth, userOrders);

export default orderRouter;

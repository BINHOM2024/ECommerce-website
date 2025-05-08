import express from "express"
import { addToUserCart, getUserCart, updateUserCart } from "../controller/cartController.js"
import userAuth from "../middleware/userAuth.js"


const cartRouter = express.Router()

cartRouter.post("/add",userAuth,addToUserCart)
cartRouter.post("/update",userAuth,updateUserCart)
cartRouter.get("/get",userAuth, getUserCart)

export default cartRouter;
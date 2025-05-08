import express from "express"
import { admin, login, register } from "../controller/usercontroller.js"

const userRouter = express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/admin", admin)

export default userRouter;
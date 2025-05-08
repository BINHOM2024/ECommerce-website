import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  const { data: { name, email, password } } = req.body;
  if (!email || !name || !password)
    return res.json({
      success: false,
      message: "fill out all the fields please",
    });

  try {
    if (!validator.isEmail(email))
      return res.json({
        success: false,
        message: "enter a valid email please ",
      });
    if (password.length < 8)
      return res.json({
        success: false,
        message: "password should be atleast 8 characters",
      });
    const exists = await userModel.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "user already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    const token = createToken(newUser._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({
      success: false,
      message: "error while registering => " + error,
    });
  }
};

const login = async (req, res) => {
  const { data: { email, password } } = req.body;
  if (!email || !password) 
    return res.json({
      success: false,
      message: "fill out all the fields please!",
    });

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.json({
        success: false,
        message: "user doesn't exists.",
      });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.json({ success: true, message: "invalid credentials" });
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({
      success: false,
      message: "error =>" + error,
    });
  }
};

const admin = async (req, res) => {
  const {
    data: { email, password },
  } = req.body;
  try {
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    )
      return res.json({ success: false, message: "invalid credentials" });
    const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "error =>: " + error });
  }
};

export { register, login, admin };

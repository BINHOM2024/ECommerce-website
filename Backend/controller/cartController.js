import userModel from "../models/userModel.js";

const addToUserCart = async (req, res) => {
  const { userId, itemId, size } = req.body;

  try {
    const user = await userModel.findById(userId);
    const cartData = await user.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(user._id, { cartData });
    return res.json({ success: true, cartData, message: "added to cart" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateUserCart = async (req, res) => {
  const { userId, itemId, size, quantity } = req.body;
  try {
    const user = await userModel.findById(userId);
    const cartData = await user.cartData;
    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "cart updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await userModel.findById(userId);
    const cartData = await user.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { updateUserCart, addToUserCart, getUserCart };

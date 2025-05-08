import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const currency = "UGX"
const deliveryCharges = 10;

//payment methods
const placeOrderCOD = async (req, res) => {
  const {
    orderData: { items, amount, address },
    userId,
  } = req.body;
  const data = {
    userId,
    items,
    amount,
    address,
    paymentMethod: "cod",
    payment: false,
    date: Date.now(),
  };
  try {
    const newOrder = new orderModel(data);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "order places" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const {
      orderData: { items, amount, address },
      userId,
    } = req.body;
    const { origin } = req.headers;
    const data = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price *3800* 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges *3800* 100,
      },
      quantity: 1,
    });
  const newOrder = new orderModel(data);
    await newOrder.save();
    const session =await stripe.checkout.sessions.create({
      success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode:"payment"
    })
  
    res.json({success:true,session_url:session.url})
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//verify stripe payment

const verifyStripe = async (req, res) => {
  const { success, orderId, userId } = req.body;
  try {
    if (success==="true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({success:true})
    } else {
      await orderModel.findByIdAndDelete(orderId)
      res.json({ success: false });
    }

  } catch (error) {
    res.json({success:false,message:error.message})
  }
}


//all orders of admin

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//all orders of a user

const userOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//uodate the status from admin
const updateStatus = async (req, res) => {
  const { status, orderId } = req.body;
  try {
    const orderStatus = await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "order status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  allOrders,
  placeOrderCOD,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe
};

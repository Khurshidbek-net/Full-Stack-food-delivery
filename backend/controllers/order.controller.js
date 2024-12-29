import Stripe from 'stripe';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const stripeSecretKey = process.env.stripe_secret_key;
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is missing!");
}
const stripe = new Stripe(stripeSecretKey);


// placing user order
const placeOrder = async (req, res) => {
  const frontend_url = process.env.frontend_url || "http://localhost:5173";

  try {
    // Validate request body
    const { userId, items, amount, address } = req.body;
    if (!userId || !items || !amount || !address) {
      return res.status(400).send({ success: false, message: "Invalid request data" });
    }

    // Create a new order
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    // Update user card data
    await userModel.findByIdAndUpdate(userId, { cardDate: {} });

    // Prepare Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    // Create a Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Respond with session URL
    res.send({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};



const verifyOrder = async(req, res) =>{
  const {orderId, success} = req.body;
  try {
    if(success == "true"){
      await orderModel.findByIdAndUpdate(orderId, {payment: true});
      res.send({success: true, message: "Paid"});
    }else{
      await orderModel.findByIdAndDelete(orderId);
      res.send({ success: true, message: "Not Paid" });
    }
  } catch (error) {
    console.log("Order error: ", error);
    res.send({success: false, message: "Error"});
  }
};


// user orders for frontend

const userOrders = async(req, res) =>{
  const userId = req.body.userId;
  try {
    const orders = await orderModel.find({userId});
    res.send({success: true, data: orders})
  } catch (error) {
    console.log("Order error: ", error);
    res.send({ success: false, message: "Error" });
  }
}


// listing orders for admin

const listOrder = async(req, res) =>{
  try {
    const orders = await orderModel.find({});
    res.send({success: true, data: orders})
  } catch (error) {
    console.log("Order error: ", error);
    res.send({ success: false, message: "Error" });
  }
};


// updating order status

const updateStatus = async(req, res) =>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
    res.send({success: true, message: "Status Updated"})
  } catch (error) {
    console.log("Order error: ", error);
    res.send({ success: false, message: "Error" });
  }
}

export { placeOrder, verifyOrder, userOrders, listOrder, updateStatus };










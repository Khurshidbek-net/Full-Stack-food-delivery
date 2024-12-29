import express from 'express';
import auth_middleware from '../middleware/auth.js';
import { listOrder, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.post("/place", auth_middleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", auth_middleware, userOrders);
orderRouter.get("/list",  listOrder);
orderRouter.post("/status", updateStatus);


export default orderRouter;
import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { OrderModel } from "../models/table.js";

const paymentRouter = express.Router();

const razorpay = new Razorpay({
    key_id: "rzp_test_S9kwgEIGFYzwbS",
    key_secret: "4aw22OtS4IrDQQi5wR4mpVPZ"
});

// CREATE ORDER
paymentRouter.post("/create-order", async (req, res) => {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR"
    });

    res.json(order);
});

// VERIFY PAYMENT
paymentRouter.post("/verify-payment", async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderData
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSign = crypto
            .createHmac("sha256", "4aw22OtS4IrDQQi5wR4mpVPZ")
            .update(sign)
            .digest("hex");

        if (expectedSign !== razorpay_signature) {
            return res.status(400).json({ success: false });
        }

        // 🔥 USERID CONFIRM SAVE
        const newOrder = new OrderModel({
            userId: orderData.userId,
            productId: orderData.productId,
            quantity: orderData.quantity,
            totalAmount: orderData.totalAmount,
            paymentId: razorpay_payment_id,
            status: "Paid"
        });

        await newOrder.save();

        res.status(200).json({
            success: true,
            message: "Order saved successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
});


export default paymentRouter;

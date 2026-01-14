const Order = require("../models/Order"); //
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create the payment session and save the order
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        // 1. Save the order to MongoDB first to get an ID for tracking
        const newOrder = new Order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        // 2. Prepare line items for the Stripe payment page
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: item.price * 100 * 80, // Price in paise
            },
            quantity: item.quantity
        }));

        // 3. Add the Delivery Fee shown in your UI
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Fee" },
                unit_amount: 5 * 100 * 80, 
            },
            quantity: 1
        });

        // 4. Create the secure Stripe Session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// NEW: Verify payment status
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            // Payment successful: Keep order and update status if needed
            await Order.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            // Payment failed: Delete the temporary order
            await Order.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};
// backend/controllers/orderController.js
const updateStatus = async (req, res) => {
    try {
        // We use req.body.newStatus because that's what your AdminOrders.jsx sends
        await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.newStatus });
        res.json({ success: true, message: "Status Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating status" });
    }
};
module.exports = { placeOrder, verifyOrder,updateStatus};
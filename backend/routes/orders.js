// const express = require('express');
// const Order = require('../models/Order');
// const auth = require('../middleware/auth');
// const router = express.Router();

// router.post('/', auth, async (req, res) => {
//   const order = await Order.create({
//     userId: req.user.id,
//     items: req.body.items,
//     totalPrice: req.body.totalPrice
//   });
//   res.json(order);
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');

// // POST: Place a new order
// router.post('/place', async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;

//     const newOrder = new Order({
//       userId,
//       items,
//       amount,
//       address
//     });

//     await newOrder.save();
//     res.status(201).json({ success: true, message: "Order placed successfully!", orderId: newOrder._id });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });


// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');

// // POST: Fetch orders for a user (Must match the endpoint in your console error)
// router.post('/userorders', async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const orders = await Order.find({ userId }).sort({ date: -1 });
//     res.json({ success: true, data: orders });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Error fetching orders" });
//   }
// });
// // GET: Fetch single order by ID
// router.get('/:orderId', async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.orderId)
//     res.json({ success: true, data: order })
//   } catch (err) {
//     res.status(500).json({ success: false })
//   }
// });

// // PATCH: Update order status (Move this here from the model file)
// router.patch('/update-status', async (req, res) => {
//   try {
//     const { orderId, newStatus } = req.body; 
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId, { status: newStatus }, { new: true }
//     );
//     res.json({ success: true, status: updatedOrder.status });
//   } catch (err) {
//     res.status(500).json({ success: false });
//   }
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');

// // Place Order
// router.post('/place', async (req, res) => {
//   try {
//     const newOrder = new Order(req.body);
//     await newOrder.save();
//     res.json({ success: true, message: "Order Placed", orderId: newOrder._id });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// });

// // Update Status (Required for the dynamic simulation)
// router.patch('/update-status', async (req, res) => {
//   try {
//     const { orderId, newStatus } = req.body;
//     await Order.findByIdAndUpdate(orderId, { status: newStatus });
//     res.json({ success: true });
//   } catch (error) {
//     res.json({ success: false });
//   }
// });

// // Get Single Order for Tracker
// router.get('/:id', async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     res.json({ success: true, data: order });
//   } catch (error) {
//     res.json({ success: false });
//   }
// });
// // Get all orders for a specific user
// router.post('/userorders', async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const orders = await Order.find({ userId }).sort({ date: -1 });
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error fetching user orders" });
//   }
// });

// router.get('/list', async (req, res) => {
//   try {
//     const orders = await Order.find({}); // Fetch everything from the collection
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     res.json({ success: false, message: "Error fetching list" });
//   }
// });
// module.exports = router;

const express = require('express');
const router = express.Router();
// Import controller functions
const { placeOrder, verifyOrder, updateStatus } = require('../controllers/orderController');
const Order = require('../models/Order');
router.patch('/update-status', updateStatus);
// Use the controller for placing orders
router.post('/place', placeOrder);

// NEW: Verification route for Stripe return
router.post('/verify', verifyOrder);
router.patch('/update-status', updateStatus);
// Keep your existing management routes
router.patch('/update-status', async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;
    await Order.findByIdAndUpdate(orderId, { status: newStatus });
    res.json({ success: true });
  } catch (error) { res.json({ success: false }); }
});

router.get('/list', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, data: orders });
  } catch (error) { res.json({ success: false, message: "Error fetching list" }); }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json({ success: true, data: order });
  } catch (error) { res.json({ success: false }); }
});

router.post('/userorders', async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId }).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) { res.json({ success: false, message: "Error fetching user orders" }); }
});

module.exports = router;
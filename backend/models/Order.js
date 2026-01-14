// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   items: Array,
//   totalPrice: Number,
//   status: { type: String, default: 'Placed' }
// });

// module.exports = mongoose.model('Order', OrderSchema);

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  amount: { type: Number, required: true },
  address: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    phone: String,
  },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false }
});

module.exports = mongoose.model('Order', OrderSchema);

// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: Array,
//   amount: Number,
//   address: Object,
//   status: { type: String, default: "Food Processing" },
//   date: { type: Date, default: Date.now },
//   payment: { type: Boolean, default: false }
// });

// module.exports = mongoose.model('Order', OrderSchema);
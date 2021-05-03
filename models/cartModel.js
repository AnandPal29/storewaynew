const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref:'Users',
        unique: true
    },
    products: [{
       item: {
           type: mongoose.Schema.ObjectId,
           ref: 'Products'
       },
       quantity: {
           type: Number,
           default: 1,
           min: 1
       }
    }],
    totalPrice: {
        type: Number,
        default: 0,
        min: 0
    },
    totalQuantity: {
        type: Number,
        default:0,
        min: 0
    }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
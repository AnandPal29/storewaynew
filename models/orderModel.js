const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref:'Users'
    },
    userDetails: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    },
    orderDetails:{
        totalQuantity: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        products:[
            {
                quantity: {
                    type: Number,
                    required: true
                },
                item: {
                    name: {
                        type: String,
                        required: true,
                    },
                    category: {
                        type: String,
                        required: true,
                    },
                    _id: {
                        type: mongoose.Schema.ObjectId,
                        required: true,
                    },
                    price: {
                        type: Number,
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                    },
                    unit: {
                        type: String,
                        required: true,
                    }
                }
            }
        ]
    },
    orderDate: {
        type:Date,
        default:Date.now()
    }
});

const Order = mongoose.model('Order', orderSchema );
module.exports = Order;
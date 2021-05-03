const Order = require('./../models/orderModel');
const Users = require('./../models/userModel');
const Cart = require('./../models/cartModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Products = require('../models/productModel');

exports.placeOrder = catchAsync(async (req, res, next) => {

    let cart = await Cart.findOne({userId: req.user.id}).populate('products.item');
    const User = await Users.findById(req.user.id).select(['firstName','lastName','email','phoneNumber']);

    if(cart.products.length <= 0){
        return next(new AppError('Order Cannot Be Placed! Cart Empty!',401));
    }
    let product;
    // cart.products.forEach(async obj => {
    //     product = await Products.findById(obj.item);
    //     if(obj.quantity > product.inStock){
    //         return next(new AppError(`${product.name} Out of Stock! Remove It From Cart And Place Order Again`,400)); 
    //     }
    // });
    for(var i=0; i<cart.products.length; i++){
        product = await Products.findById(cart.products[i].item);
        if(cart.products[i].quantity > product.inStock) {
            return next(new AppError(`Only ${product.inStock} of ${product.name} is in Stock! Remove or Reduce Quantity and Place Order Again!`,400));
        }
    }
    const userId = req.user.id;

    const userDetails = {};
    userDetails.name = User.firstName + " " + User.lastName;
    userDetails.email = User.email;
    userDetails.phoneNumber = User.phoneNumber;


    const orderDetails = {};
    orderDetails.totalQuantity = cart.totalQuantity;
    orderDetails.totalPrice = cart.totalPrice;
    orderDetails.products = [];

    cart.products.forEach(prod => {
        let temp = {};
        temp.quantity = prod.quantity,
        temp.item = {};
        temp.item.name = prod.item.name;
        temp.item.category = prod.item.category;
        temp.item._id = prod.item._id;
        temp.item.price = prod.item.price;
        temp.item.quantity = prod.item.quantity;
        temp.item.unit = prod.item.unit;
        orderDetails.products.push(temp);
    })
    
    
    // console.log("HELLO WORLD");
    const order = await Order.create(
        {
            userId,
            userDetails,
            orderDetails
        }
    );
   
    cart.products.forEach(async (ele) => {
        const ProductId = ele.item._id;
        const ProductQuantity = ele.quantity*1;
        // console.log(ProductId);
        // console.log(ProductQuantity);
        await Products.findByIdAndUpdate(ProductId, {$inc: {inStock: -ProductQuantity, unitSold: +ProductQuantity}});
    });

    cart = await Cart.findOneAndUpdate({userId: req.user.id}, {products: [], totalPrice:0, totalQuantity:0}, {new: true, runValidators:true});
    // console.log(cart);

    res.status(200).json({
        status:'success',
        message: 'successful',
        data: {
            order
        }
    })
});

exports.deleteOrder = catchAsync(async (req, res, next) => {

    let order = await Order.findById(req.params.orderId);
    if(!order){
        return next(new AppError('No Order Found!',404));
    }

    if(order.userId != req.user.id){
        return next(new AppError('You are Not Allowed To Cancel This Order!',401));
    }
   

    if(order.orderStatus == 'Out For Delivery' || order.orderStatus == 'Delivered'){
        return next(new AppError('You Can No Longer Delete This Order!',401));
    }
    
    order.orderDetails.products.forEach(async (ele) => {
        const ProductId = ele.item._id;
        const ProductQuantity = ele.quantity*1;
        // console.log(ProductId);
        // console.log(ProductQuantity);
        await Products.findByIdAndUpdate(ProductId, {$inc: {inStock: ProductQuantity}});
    });
    
    order = await Order.findByIdAndDelete(req.params.orderId);

    res.status(200).json({
        status:'success',
        message:'Order Canceled'
    });

});

exports.getPreviousOrders = catchAsync(async(req, res, next) => {

    const orders = await Order.find({userId: req.user.id}).populate('orderDetails.products.item', 'name price quantity unit category');
    
    res.status(200).json({
        status:'success',
        lenght:orders.length,
        data:{
            orders
        }
    })
});

exports.updateOrder = catchAsync(async (req, res, next) => {

    const orderStatus = req.body.orderStatus;
    if(!orderStatus){
        return next(new AppError('Please Provide Order Status',400));
    }

    const order = await Order.findByIdAndUpdate(req.params.orderId, {orderStatus: orderStatus}, {runValidators:true, new:true});
    res.status(200).json({
        status:'success',
        message:`Order Status Updated To ${orderStatus}`,
        data:{
            order
        }
    })
});

exports.getPendingOrder = catchAsync(async (req, res, next) => {

    const orders = await Order.find({orderStatus: { $in:['Order Placed','Processing']}});
    res.status(200).json({
        status:'success',
        data:{
            orders
        }
    })

});

exports.deliverOrder = catchAsync(async (req, res, next) => {

    if(!req.body.orderId){
        return next(new AppError('Please Provide Order Id',400));
    }

    let order = await Order.findById(req.body.orderId);
    if(!order || order.orderStatus!='Out For Delivery'){
        return next(new AppError('No Order Found To Be Updated',404));
    }

    order = await Order.findByIdAndUpdate(req.body.orderId, {orderStatus: 'Delivered'});
    res.status(200).json({
        status:'success',
        message: 'Order Status Updted To Delivered'
    })


});
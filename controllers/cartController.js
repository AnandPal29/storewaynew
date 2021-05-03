const Products = require('../models/productModel');
const Cart = require('./../models/cartModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const mongoose = require('mongoose');

exports.addToCart = catchAsync(async(req, res, next) => {

  const productId = req.params.productId;
  // console.log(productId);
  const product = await Products.findById(productId);
  // console.log(product);
  //If No Product Found Return Error
  if(!product || product.inStock < 1){
      return next(new AppError(`No Product Found With Id:${productId} Or Product Out of Stock!`,404));
  }
  
  let cart = await Cart.findOne({userId: req.user.id});
  
  //If Cart Contains Some Products
  if(cart.products.length > 0){
    //const productArray =  cart.products.map(obj => obj);
    let result;

    //Check if Products Array Already Contains Passed Product
    if(cart.products.some(product => product.item == productId)){
      result = true;
    }
    
    if(result){
      const index = cart.products.findIndex(obj => obj.item == productId) //Find the Index of Passed Item In Array
      cart.products[index].quantity = cart.products[index].quantity+1; // Increment The Quantity By 1
     // Save The Cart
    }else {
      //Create New Item In Products Array
      cart = await Cart.findOneAndUpdate({userId: req.user.id}, {$push:{products:{item: productId}}}, {runValidators: true, new: true});
    }
  }else {
    //If Products Array Empty Create New Item As Passed Item
    cart = await Cart.findOneAndUpdate({userId: req.user.id}, {$push:{products:{item: productId}}}, {runValidators: true, new: true});
  }
  cart.totalQuantity = cart.totalQuantity + 1;
  cart.totalPrice = cart.totalPrice + product.price*1;
  cart.save(); 
  // Send Response 
  res.status(200).json({
    status:'success',
    message:'Item Added To Cart!'
  })
})

exports.removeAllFromCart = catchAsync( async(req,res,next) =>{

  //Take The Passed Product ID
  const productId = req.params.productId;

  //Check if The Product is in Current User's Cart
  let cart= await Cart.findOne({userId: req.user.id, "products.item": productId});
 
  //If Not Present Give Error
  if(!cart){
    return next(new AppError("No such product Found",401));
  }

  let index;
  index = cart.products.findIndex(obj => obj.item == productId);
  const removedProductQuantity =  cart.products[index].quantity;
  
  //Pull The Product Passed From Products Array
  cart = await Cart.findOneAndUpdate({userId:req.user.id},{"$pull":{"products":{"item":productId}}},{runValidators: true, new: true});
  cart.totalQuantity = cart.totalQuantity - removedProductQuantity;

  const product = await Products.findById(productId);
  cart.totalPrice = cart.totalPrice - (removedProductQuantity * product.price);

  cart.save();

  //Send Response
  res.status(200).json({
    status:"sucess",
    message:"Successfully removed Item from cart"
  });
});
  
  
exports.removeFromCart = catchAsync( async(req,res,next)=>{

  //Take The Passed Product Id
  const productId = req.params.productId;

  //Check if Product Exist in Current User's Cart
  let cart= await Cart.findOne({userId:req.user.id, "products.item": productId});
 
  //If Not Present Give Error
  if(!cart){
    return next(new AppError("No such product Found",404));
  }
  
  const index = cart.products.findIndex(obj => obj.item == productId)

  // Check if Quantity is More than 1 
  if( cart.products[index].quantity > 1){
    //Decrement Quantity By 1
    cart.products[index].quantity = cart.products[index].quantity-1;
  }
  else{
    //If Quantity is 1, Remove the Product From Cart
    await Cart.findOneAndUpdate({userId:req.user.id},{"$pull":{"products":{"item":productId}}},{runValidators: true, new: true});
  }

  cart.totalQuantity = cart.totalQuantity - 1;

  const product = await Products.findById(productId);
  cart.totalPrice = cart.totalPrice - product.price;

  cart.save();

  //Send Response
  res.status(200).json({
    status:'success',
    message:'Item Removed From Cart!',
  });
  
});

exports.getCart = catchAsync(async (req, res, next) => {

  const cart = await Cart.findOne({userId: req.user.id}).populate('products.item', 'name price quantity unit category');
  if(!cart) {
    return next(new AppError('No Cart Found',404));
  }

  res.status(200).json({
    status:'success',
    data: {
      cart
    }
  });
});

exports.addToCartByBarcode = catchAsync(async(req, res, next) => {
  
  const barcodeNum = req.params.barcodeNum;
  // console.log(productId);
  const product = await Products.findOne({barcode: barcodeNum});
  const productId = product._id;

  //If No Product Found Return Error
  if(!product || product.inStock < 1){
      return next(new AppError(`No Product Found With Id:${productId} Or Product Out of Stock!`,404));
  }
  
  let cart = await Cart.findOne({userId: req.user.id});
  
  //If Cart Contains Some Products
  if(cart.products.length > 0){
    //const productArray =  cart.products.map(obj => obj);
    let result;
    
    
    //Check if Products Array Already Contains Passed Product
    if(cart.products.some(product => `${product.item}` == `${productId}`)){
      result = true;
    }
    
    if(result){
      const index = cart.products.findIndex(obj => `${obj.item}` == `${productId}`) //Find the Index of Passed Item In Array
      cart.products[index].quantity = cart.products[index].quantity+1; // Increment The Quantity By 1
     // Save The Cart
    }else {
      //Create New Item In Products Array
      cart = await Cart.findOneAndUpdate({userId: req.user.id}, {$push:{products:{item: productId}}}, {runValidators: true, new: true});
    }
  }else {
    //If Products Array Empty Create New Item As Passed Item
    cart = await Cart.findOneAndUpdate({userId: req.user.id}, {$push:{products:{item: productId}}}, {runValidators: true, new: true});
  }
  cart.totalQuantity = cart.totalQuantity + 1;
  cart.totalPrice = cart.totalPrice + product.price*1;
  cart.save(); 
  // Send Response 
  res.status(200).json({
    status:'success',
    message:'Item Added To Cart!'
  })
})
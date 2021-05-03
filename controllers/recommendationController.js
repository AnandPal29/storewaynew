const catchAsync = require('../utils/catchAsync');
const Order = require('./../models/orderModel');
const Products = require('./../models/productModel');


exports.getRecommendations = catchAsync(async(req, res, next) => {
    const orders = await Order.aggregate([
        {
            $match: { userId: req.user._id}
        },    
        { 
            $unwind: '$orderDetails.products' 
        },
        {
            $group: {
                _id: "$orderDetails.products.item.category",
                "count": { "$sum" : "$orderDetails.products.quantity"}
            }
        },
        {
            $sort: { count: -1}
        }
      ]) 
    let products, prod1;
    if(orders.length > 0){
        // console.log(orders[0]._id);
        products = await Products.find({category:orders[0]._id}).sort({unitSold: -1}).limit(3);
    }
    if(!products){
        products = [];
    }
    prod1 = await Products.find({inOffer: true});
    prod1.forEach(prod => {
        products.push(prod);
    })
    // console.log(products);
    
    //console.log(orders[0].orderDetails.products.item.category);

    res.status(200).json({
        status:'success',
        lenght:products.length,
        data:{
            products
        }
    })
})

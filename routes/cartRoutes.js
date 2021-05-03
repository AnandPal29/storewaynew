const express = require('express');
const cartController = require('./../controllers/cartController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/getCart', authController.protect, cartController.getCart);
router.patch('/addToCart/:productId', authController.protect, cartController.addToCart);
router.patch('/addToCartByBarcode/:barcodeNum', authController.protect, cartController.addToCartByBarcode);
router.patch('/removeFromCart/:productId',authController.protect,cartController.removeFromCart);
router.patch('/removeAllFromCart/:productId',authController.protect,cartController.removeAllFromCart);



module.exports = router;
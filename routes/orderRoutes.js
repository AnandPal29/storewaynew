const express = require('express');
const orderController = require('./../controllers/orderController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/placeOrder', authController.protect, orderController.placeOrder);
router.get('/previousOrder',authController.protect, orderController.getPreviousOrders);
router.post('/cancelOrder/:orderId', authController.protect, orderController.deleteOrder);
router.patch('/updateOrder/:orderId', authController.protect, authController.restrictTo('admin'), orderController.updateOrder);
router.get('/getPendingOrders', authController.protect, authController.restrictTo('admin'), orderController.getPendingOrder);
router.post('/deliverOrder', authController.protect, authController.restrictTo('deliveryBoy'),orderController.deliverOrder);

module.exports = router;
const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const route = express.Router();

route.get('/', viewController.getAdminLogin);

route.get('/products',authController.protect, authController.restrictTo('admin'),viewController.getProducts);
route.get('/productDetails/:slug',authController.protect, authController.restrictTo('admin'), viewController.getProductDetails);
route.get('/createProduct',authController.protect, authController.restrictTo('admin'), viewController.createProduct);
route.get('/offerProducts', authController.protect, authController.restrictTo('admin'), viewController.getOfferProducts);
route.get('/lessStock', authController.protect, authController.restrictTo('admin'), viewController.getLessStock);
route.get('/deletedProducts', authController.protect, authController.restrictTo('admin'), viewController.getDeletedProducts);
route.get('/search/:searchItem', authController.protect, authController.restrictTo('admin'), viewController.getSearchedProducts);
route.get('/categories/:category', authController.protect, authController.restrictTo('admin'), viewController.getCategoryProducts);
route.get('/users', authController.protect, authController.restrictTo('admin'), viewController.getUsers);
route.get('/userDetails/:userId', authController.protect, authController.restrictTo('admin'), viewController.getUserDetails);
route.get('/deactivatedUsers', authController.protect, authController.restrictTo('admin'), viewController.getDeactiveUsers);
route.get('/searchUser/:name', authController.protect, authController.restrictTo('admin'), viewController.getSearchedUsers);

module.exports = route;
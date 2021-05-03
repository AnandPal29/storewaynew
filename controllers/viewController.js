const Products = require('./../models/productModel');
const Users = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAdminLogin = (req, res) => {
    res.status(200).render('adminLogin');
}

exports.getProducts = catchAsync(async (req, res, next) => {
    const products = await Products.find({isDeleted: {$ne: true}});
    res.status(200).render('products', {
        products
    });
})

exports.getProductDetails = catchAsync(async (req, res, next) => {
    const product = await Products.findOne({slug: req.params.slug});
    res.status(200).render('productDetails', {
        product: product
    });
})

exports.createProduct = catchAsync(async (req, res, next) => {
    res.status(200).render('createProduct');
})

exports.getOfferProducts = catchAsync(async (req, res, next) => {
    const products = await Products.find({inOffer: true});
    res.status(200).render('products', {
        products
    });
})

exports.getSearchedProducts = catchAsync(async (req, res, next) => {
    const products = await Products.find({$text: {$search: req.params.searchItem}});
    res.status(200).render('products', {
        products
    });
})

exports.getCategoryProducts = catchAsync(async (req, res, next) => {
    const products = await Products.find({category: req.params.category});
    res.status(200).render('products', {
        products
    });
})

exports.getLessStock = catchAsync(async (req, res, next) => {
    const products = await Products.find({inStock: {$lt:100}});
    res.status(200).render('products', {
        products
    });
})

exports.getDeletedProducts = catchAsync(async (req, res, next) => {
    const products = await Products.find({isDeleted: true});
    res.status(200).render('deletedProducts', {
        products
    });
})

exports.getUsers = catchAsync(async (req, res, next) => {
    const users = await Users.find();
    res.status(200).render('users', {
        users
    });
})

exports.getUserDetails = catchAsync(async (req, res, next) => {
    const user = await Users.findOne({_id: req.params.userId});
    res.status(200).render('userDetails', {
        user
    });
})

exports.getDeactiveUsers = catchAsync(async (req, res, next) => {
    const users = await Users.find({isActive: false});
    res.status(200).render('users', {
        users
    });
})

exports.getSearchedUsers = catchAsync(async (req, res, next) => {
    const users = await Users.find({$text: {$search: req.params.name}});
    console.log(users);
    res.status(200).render('users', {
        users
    });
})
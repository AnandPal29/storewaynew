const express = require('express');
const Products = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const fs = require('fs');

exports.getAllProducts = catchAsync(async (req, res, next) => {
    // console.log('Get All Products')
    const products = await Products.find();
    fs.writeFileSync('./products.json', products.toString(), 'utf-8');
    res.status(200).json({
        status:'success',
        size: products.length,
        data: {
            products
        }
    });
});

exports.getProduct = catchAsync(async(req, res, next) => {
    
    const product = await Products.findById(req.params.id);

    if(!product) {
        return next(new AppError(`No Product Found With Id:${req.params.id}`, 404));
    }
    

    res.status(200).json({
        status:'success',
        data: {
            product
        }
    });
})

exports.createProduct = catchAsync(async (req, res, next) => {
    // console.log('Hello');
    // console.log(req.file);
    req.body.productImage = req.file.filename;
    // console.log("Body:" + req.body.productImage);
    const newProduct = await Products.create(req.body);

    res.status(200).json({
        status:'success',
        data: {
            newProduct
        }
    });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
    // console.log(req.file.filename);
    // console.log('Hello')
    // if(req.file.filename){
    //     req.body.productImage = req.file.filename;
    // }
    const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators: true  });

    if(!updatedProduct) {
        return next(new AppError(`Cannot Find Product With ID: ${req.params.id}`, 402));
    }

    res.status(200).json({
        status:'success',
        data: {
            updatedProduct
        }
    });
})
exports.updateProductImage = catchAsync(async (req, res, next) => {
    // console.log(req.file.filename);
    if(req.file.filename){
        req.body.productImage = req.file.filename;
    }
    const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators: true  });

    if(!updatedProduct) {
        return next(new AppError(`Cannot Find Product With ID: ${req.params.id}`, 402));
    }

    res.status(200).json({
        status:'success',
        data: {
            updatedProduct
        }
    });
})

exports.deleteProduct = catchAsync(async(req, res, next) => {
    const product = await Products.findByIdAndUpdate(req.params.id, {isDeleted: true});
    if(!product) {
        return next(new AppError(`Cannot Find Product With ID: ${req.params.id}`, 404));
    }
    res.status(204).json({
        status:'success',
        message: ''
    });
});

exports.getProductCategories = catchAsync(async(req, res, next) => {
    const productCategory = await Products.distinct('category')
    if(!productCategory) {
        return next(new AppError(`Cannot Find Product Category`, 404));
    }
    res.status(200).json({
        status:'success',
        data: {
            productCategory
        }
    });
});
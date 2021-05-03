const express = require('express');
const mongoose = require('mongoose');
const Users = require('./userModel');

const statSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users'
    },
    productDetails: [
        {
            category:{
                type: String,
                required: true
            },
            unitsBought: {
                type: Number,
                default:0
            }
        }
    ]
})

const Stats = mongoose.model('Stats', statSchema);
module.exports = Stats;
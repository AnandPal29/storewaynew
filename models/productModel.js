const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name!'],
        unique: true
    },
    slug: String,
    price : {
        type: Number,
        required: [true,'A Product Must Have a Price']
    },
    category: {
        type: String,
        enum: ['grocery', 'vegetablesAndFruits', 'personalCare','householdItems', 'snacks', 'beverages','breakfastAndDairy'],
        required: [true, 'The Category Must Be in grocery, vegetablesAndFruits, personalCare, snacks and babyCare']
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        enum: ['ml','gm','litre','kg'],
        required:[true, 'A Product Must Have a Unit']
    },
    inStock: {
        type: Number,
        required: true, 
        default: 2000,
        min: [0, 'Stock Cannot Be Less than 0']
    },
    productImage: {
        type: String,
        required: true
    },
    hsnCode: {
        type: String,
        required: true,
        default: '11223344'
    },
    barcode: {
        type: String,
        required: true,
        default: '112233445566'
    },
    unitSold: {
        type: Number,
        default: 0
    },
    inOffer:{
        type: Boolean,
        required: true,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true }
});

productSchema.pre('save', function(next) {
    this.slug= slugify(this.name, { lower: true });
    next();
})

const Products = mongoose.model('Products', productSchema);
module.exports = Products;
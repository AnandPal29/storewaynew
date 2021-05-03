const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Products = require('./models/productModel');
const axios = require('axios');
const catchAsync = require('./utils/catchAsync');

dotenv.config({ path: './config.env' });

const DB = process.env.MongoDB.replace(
  '<password>',
  process.env.MongoDB_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/final-user-data.json`, 'utf-8'));
const products =  JSON.parse(fs.readFileSync(`${__dirname}/product-data.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    //await Tour.create(tours);
    //await User.create(users, { validateBeforeSave: false });
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    //await Tour.deleteMany();
    await Review.deleteMany();
    //await User.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const testData = () => {
    products.forEach(obj =>{
      pushData(obj);
    })
    console.log('Data Uploaded');
}

const pushData = async (obj) => {
    const inStock = 1000;
    const hsnCode = 11223344;
    const barcode = 112233445566;
    const unitSold = 0;
    const category = obj.category;
    const name = obj.name;
    const price = obj.price;
    const productImage = obj.productImage;
    const quantity = obj.quantity;
    const unit = obj.unit;

    try{
        await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/products',
            data: {
                inStock: inStock,
                hsnCode: hsnCode,
                barcode: barcode,
                unitSold: unitSold,
                category: category,
                name: name,
                price: price,
                productImage: productImage,
                quantity: quantity,
                unit: unit
            }
        })
    }
    catch(err){
        console.log(err);
    }
}

createSample = catchAsync(async(req, res, next) => {
  const users = await User.find();
  users.forEach(obj => {
    console.log(obj._id);
  })
  next;
})

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}else if(process.argv[2] === '--test'){
    testData();
}else if(process.argv[2] === '--createSample'){
  createSample();
}

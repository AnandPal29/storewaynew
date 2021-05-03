const express = require('express');
const productController = require('../controllers/productController');
const authController = require('./../controllers/authController');
const recommendationController = require('./../controllers/recommendationController');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/uploads');
    },
    filename: function(req, file, cb) {
        console.log(req.body.name);
        cb(null, Date.now()+req.body.name + '.' + file.mimetype.split('/')[1]);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload = multer(
    {
        storage: storage, 
        limits:{
            fieldSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    }
)

const router = express.Router();

router.route('/')
    .get(productController.getAllProducts)
    .post(upload.single('productImage'),productController.createProduct);

router.route('/:id')
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

router.route('/updateProductImage/:id')
    .patch(upload.single('productImage'), productController.updateProductImage);


module.exports = router;
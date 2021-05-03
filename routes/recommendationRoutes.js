const express = require('express');
const recommendationController = require('./../controllers/recommendationController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(authController.protect,recommendationController.getRecommendations);

module.exports = router;
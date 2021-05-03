const User = require('./../models/userModel');
const catchAsync = require('./catchAsync');

createSample = catchAsync(async(req, res, next) => {
    const users = await User.find();
    // console.log('Done');
    next;
})

createSample();
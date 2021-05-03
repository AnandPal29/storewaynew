const Users = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUser = catchAsync(async (req, res, next) => {
    // console.log('Get All Products')
    const users = await users.find();
    
    res.status(200).json({
        status:'success',
        size: users.length,
        data: {
            users
        }
    });
});

exports.getUser = (req, res, next) => {
    return res.status(200).json({
        status: 'success',
        message: 'This Route is Not Yet Implemented'
    });
}

exports.createUser = (req, res, next) => {
    return res.status(200).json({
        status: 'success',
        message: 'Use /api/v1/users/signup To Create an Account!'
    });
}

exports.updateUser = catchAsync(async (req, res, next) => {

    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators: true  });

    if(!updatedUser) {
        return next(new AppError(`Cannot Find User With ID: ${req.params.id}`, 402));
    }

    res.status(200).json({
        status:'success',
        data: {
            updatedUser
        }
    });
})

exports.deleteUser = (req, res, next) => {
    return res.status(200).json({
        status: 'success',
        message: 'This Route is Not Yet Implemented'
    });
}
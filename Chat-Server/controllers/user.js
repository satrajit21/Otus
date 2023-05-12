const User = require('../models/users');
const filterObj = require('../utils/filterObj');
const catchAsync = require("../utils/catchAsync");

exports.updateMe = catchAsync(async (req, res, next) => {
    const { user } = req;
    filterObj(
        req.body,
        "firstName",
        "lastName",
        "about",
        "avatar"
    );

    const userDoc = await User.findByIdAndUpdate(req.user._id, filteredBody,{new:true,ValidateModifiedOnly: true});

    res.status(200).json({
        status: "success",
        data: userDoc,
        message: "User Updated successfully",
    });
});


const mongoose = require('mongoose')
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true;
};
const isValidRequestBody = function (requestbody) {
    return Object.keys(requestbody).length > 0;
};

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const ValidSize= function(value)
{
    for (i = 0; i < value.length; i++) {
        let size = ["S", "XS", "M", "X", "L", "XXL", "XL"] 
        if (!(size.includes(value[i])))
        {   
            return false
        }

    }
    return true
}

const isValidStatus = function(title) {
    return ['pending', 'completed', 'cancelled'].indexOf(title) !== -1
}



module.exports={isValid,isValidRequestBody,isValidObjectId,ValidSize,isValidStatus}
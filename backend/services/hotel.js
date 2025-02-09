const db = require('../models');
const { Op } = require("sequelize");

const { UnauthorizedError, BadRequestError, ValidationError, DataNotFoundError } = require('../utils/customError');

exports.addHotel = async (body) => {
    const insertHotel = await db.hotel.create(body);
    if(!insertHotel){
        throw new BadRequestError("Error While Adding Hotel.");
    }
    return {  
        statusCode: 200, 
        message: 'Hotel Added Successfully'
    };
}

exports.retriveHotels = async (body) => {
    const hotelData = await db.hotel.findAll({
        where: {
            deleteAt: null
        }
    });

    return {  
        statusCode: 200, 
        message: 'Hotels Fetched Successfully',
        data: hotelData
    };
}

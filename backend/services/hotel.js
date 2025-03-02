const db = require('../models');

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

exports.retriveHotels = async () => {
    const hotelData = await db.hotel.findAll({
        where: {
            deleted_at: null
        },
        attributes: ["name", "address", "id", "baseTokenPoints"]
    });

    return {  
        statusCode: 200, 
        message: 'Hotels Fetched Successfully',
        data: hotelData
    };
}

exports.updateHotel = async (id, body) => {
    const hotelExist = await db.hotel.findOne({
        where: {
            id,
            deleted_at: null
        }
    });
    if(!hotelExist){
        throw new DataNotFoundError(`Hotel with id ${id} not found`);
    }

    await db.hotel.update(
        body,
        {
            where: {
                id
            }
        }
    );
    return {  
        statusCode: 200, 
        message: 'Hotels Update Successfully'
    };
}

exports.removeHotel = async (id) => {
    const hotelExist = await db.hotel.findOne({
        where: {
            id,
            deleted_at: null
        }
    });
    if(!hotelExist){
        throw new DataNotFoundError(`Hotel with id ${id} not found`);
    }

    await db.hotel.update(
        { deletedAt: Date.now() },
        {
            where: {
                id
            }
        }
    );
    return {  
        statusCode: 200, 
        message: 'Hotels Deleted Successfully'
    };
}

const db = require('../models');
const { DataNotFoundError, BadRequestError } = require('../utils/customError');

exports.createCustomer = async (body, userId) => {
    const { hotelId, amount } = body;
    const hotelExist = await db.hotel.findOne({
        where:{
            id: hotelId,
            deletedAt: null
        }
    });
    if(!hotelExist){
        throw new BadRequestError(`Hotel with the id ${hotelId} does not exist`);
    }

    body.createdBy = userId;
    const addCustomer = await db.customer.create(body);
    if(!addCustomer){
        throw new BadRequestError("Error While Adding Customer");
    }

    // add transaction
    const transactionObject = {
        customerId: addCustomer.id,
        hotelId,
        amount
    }

    await db.transaction_logs.create(transactionObject);

    // get registration token points
    const tokenPoints = hotelExist.baseTokenPoints;

    await db.customer_token_points.create({
        customerId: addCustomer.id,
        hotelId,
        points: tokenPoints 
    });

    // sms logic

    return { 
        statusCode: 200, 
        message: 'Customer Added Successfully' 
    }
}

exports.retriveCustomers = async (body) => {

}
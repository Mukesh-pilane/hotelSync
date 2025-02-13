const db = require('../models');
const { DataNotFoundError, BadRequestError } = require('../utils/customError');
const { Op, Sequelize } = require('sequelize');

exports.createCustomer = async (body) => {
    const { belongsToHotel, amount } = body;
    const hotelExist = await db.hotel.findOne({
        where:{
            id: belongsToHotel,
            deletedAt: null
        }
    });
    if(!hotelExist){
        throw new BadRequestError(`Hotel with the id ${belongsToHotel} does not exist`);
    }

    const addCustomer = await db.customer.create(body);
    if(!addCustomer){
        throw new BadRequestError("Error While Adding Customer");
    }

    // add transaction
    const transactionObject = {
        customerId: addCustomer.id,
        hotelId: belongsToHotel,
        amount
    }

    await db.transaction_logs.create(transactionObject);

    // get amount token points
    let tokenRange = await db.token_range.findOne({
        where: {
            startAmount: { [Op.lte]: amount },
            endAmount: { [Op.gte]: amount },
            deletedAt: null
        },
        order: [['startAmount', 'desc']]
    });
    if(!tokenRange){  // if amount if greater than every range take maximim range
        tokenRange = await db.token_range.findOne({
            where: {
                deletedAt: null
            },
            order: [['startAmount', 'desc']],
            limit: 1
        });
    }

    // totel token points
    const tokenPoints = (hotelExist?.baseTokenPoints + tokenRange?.tokenPoints ) || 0;

    await db.customer_token_points.create({
        customerId: addCustomer.id,
        hotelId: belongsToHotel,
        points: tokenPoints 
    });

    // sms logic

    return { 
        statusCode: 200, 
        message: 'Customer Added Successfully' 
    }
}

exports.retriveCustomers = async (hotelId) => {
    const customerData = await db.customer.findAll({
        where: {
            belongsToHotel: hotelId,
            deletedAt: null
        },
        include: [
            {
                model: db.customer_token_points,
                attributes: ['points']
            }
        ],
        attributes: ['id', 'firstName', "lastName", "mobile", "documents"]
    });
    return { 
        statusCode: 200, 
        message: 'Customer Data Fetched Successfully',
        data: customerData
    }
}

exports.addTransaction = async (body) => {
    const { customerId, amount } = body;
    const insertTransactionLogs = await db.transaction_logs.create(body);
    if(!insertTransactionLogs){
        throw new BadRequestError("Error While Adding Transaction Logs.");
    }

    // get amount token points
    let tokenRange = await db.token_range.findOne({
        where: {
            startAmount: { [Op.lte]: amount },
            endAmount: { [Op.gte]: amount },
            deletedAt: null
        },
        order: [['startAmount', 'desc']]
    });
    if(!tokenRange){  // if amount if greater than every range take maximim range
        tokenRange = await db.token_range.findOne({
            where: {
                deletedAt: null
            },
            order: [['startAmount', 'desc']],
            limit: 1
        });
    }

    // totel token points
    const tokenPoints = tokenRange?.tokenPoints || 0;

    const updateTokenPoints = await db.customer_token_points.update(
        { points: Sequelize.literal(`points + ${tokenPoints}`) },
        { where: { customerId }}
    );

    // sms logic
    if(!updateTokenPoints){
        throw new BadRequestError("Error While Adding Transaction Logs.");
    }
    return {  
        statusCode: 200, 
        message: 'Customer Logs Added Successfully'
    };
}
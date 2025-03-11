const db = require('../models');
const { DataNotFoundError, BadRequestError, ValidationError } = require('../utils/customError');
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
    const customerExist = await db.customer.findOne({
        where: {
            mobile: body.mobile,
            belongsToHotel: body.belongsToHotel
        }
    });
    if(customerExist){
        throw new ValidationError(`Customer with mobile number ${body.mobile} Already exist`);
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
            hotelId: belongsToHotel,
            deletedAt: null
        },
        order: [['startAmount', 'desc']]
    });
    if(!tokenRange){  // if amount if greater than every range take maximim range
        tokenRange = await db.token_range.findOne({
            where: {
                deletedAt: null,
                hotelId: belongsToHotel,
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

exports.modifyCustomer = async (id, body) => {
    const modifiedCustomer = await db.customer.update(
        body,
        {
            where: {
                id: id,
                deletedAt: null
            }
        }
    );
    if(!modifiedCustomer){
        throw new BadRequestError("Error while modifying customer");
    }
    return { 
        statusCode: 200, 
        message: 'Customer Updated Successfully' 
    }
}

exports.retriveCustomers = async (query) => {
    let page = Number(query.page) || 1;
    let limit = Number(query.limit) || 10;
    const skip =  (page - 1) * limit;
    const search = query.search || "";
    const { hotelId } = query;

    const whereClause = { 
        ...(search && {
          [Op.or] : [
            { firstName : { [Op.like]: `%${search}%` } },
            { lastName : { [Op.like]: `%${search}%` } },
            { mobile: { [Op.like]: `%${search}%` } }
          ]
        }),
        belongsToHotel: hotelId,
        deletedAt: null,
    }
    

    const customerData = await db.customer.findAndCountAll({
        where: whereClause,
        include: [
            {
                model: db.customer_token_points,
                attributes: ['points']
            }
        ],
        attributes: ['id', 'firstName', "lastName", "mobile", "documents", "updatedAt"],
        offset: skip,
        limit,
        order: [["updatedAt", "desc"]]
    });
    return { 
        statusCode: 200, 
        message: 'Customer Data Fetched Successfully',
        total: customerData.count,
        data: customerData.rows
    }
}

exports.removeCustomer = async (id) => {
    if(!id){
        throw new BadRequestError("Invalid Cusomer Id");
    }
    const customerRecord = await db.customer.findAll({
        where: {
            id: id,
            deletedAt: null
        }
    });
    if(!customerRecord){
        throw new BadRequestError("Customer Not Found");
    }

    const deleteCustomer = await db.customer.update(
        { deletedAt: Date.now() },
        {
            where: {
                id: id,
                deletedAt: null
            }
        }
    );
    if(!deleteCustomer){
        throw new BadRequestError("Error while deleting customer");
    }
    return { 
        statusCode: 200, 
        message: 'Customer Deleted Successfully' 
    }
}

exports.addTransaction = async (body) => {
    const transaction = await db.sequelize.transaction();
    const { customerId, amount } = body;
    const insertTransactionLogs = await db.transaction_logs.create(body);

    if(!insertTransactionLogs){
        await transaction.rollback();
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
    const redeemedPoints = body.redeemedPoints || 0;

    const updateTokenPoints = await db.customer_token_points.update(
        { points: Sequelize.literal(`points + ${tokenPoints} - ${redeemedPoints}`) },
        { where: { customerId }}
    );

    // sms logic
    if(!updateTokenPoints){
        await transaction.rollback();
        throw new BadRequestError("Error While Adding Transaction Logs.");
    }
    await transaction.commit();
    return {  
        statusCode: 200, 
        message: 'Transaction Added Successfully'
    };
}

exports.retriveTransactions = async (query) => {
    let page = Number(query.page) || 1;
    let limit = Number(query.limit) || 10;
    const skip =  (page - 1) * limit;
    const search = query.search || "";
    const { hotelId } = query;

    const whereClause = { 
        ...(search && {
          [Op.or] : [
            { "$customer.first_name$" : { [Op.iLike]: `%${search}%` } },
            { "$customer.last_name$" : { [Op.iLike]: `%${search}%` } },
            { "$customer.mobile$": { [Op.iLike]: `%${search}%` } }
          ]
        }),
        hotelId,
        deletedAt: null,
    }
    const transactionData = await db.transaction_logs.findAndCountAll({
        include: [
            {
                model: db.customer,
                attributes: ["id", "firstName", "lastName", "mobile", "updatedAt"],
            }
        ],
        where: whereClause,
        limit,
        offset: skip,
        attributes: ["id", "amount"],
        order: [['updatedAt', 'desc']],
    });
    return { 
        statusCode: 200, 
        message: 'Transaction Data Fetched Successfully',
        total: transactionData.count,
        data: transactionData.rows
    }
}

exports.modifyTransactions = async (transactionId, body) => {
    const transaction = await db.sequelize.transaction();
    // find transaction logs
    const transactionData = await db.transaction_logs.findOne({
        where: {
            id: transactionId,
            deletedAt: null
        }
    });
    if(!transactionData){
        await transaction.rollback();
        throw new DataNotFoundError(`Transaction with id ${transactionId} not found`);
    }
    const previousAmount = transactionData.amount;

     // get previous token points
     let tokenRange = await db.token_range.findOne({
        where: {
            startAmount: { [Op.lte]: previousAmount },
            endAmount: { [Op.gte]: previousAmount },
            deletedAt: null
        },
        order: [['startAmount', 'desc']]
    });
    if(!tokenRange){ 
        tokenRange = await db.token_range.findOne({
            where: {
                deletedAt: null
            },
            order: [['startAmount', 'desc']],
            limit: 1
        });
    }
    const previouisAddedTokenPoints = tokenRange?.tokenPoints || 0;
    const previousRedeemedPoints = transactionData?.redeemedPoints || 0;

    // new amount token points
    const newAmount = body.amount;
    tokenRange = await db.token_range.findOne({
        where: {
            startAmount: { [Op.lte]: newAmount },
            endAmount: { [Op.gte]: newAmount },
            deletedAt: null
        },
        order: [['startAmount', 'desc']]
    });
    if(!tokenRange){ 
        tokenRange = await db.token_range.findOne({
            where: {
                deletedAt: null
            },
            order: [['startAmount', 'desc']],
            limit: 1
        });
    }
    const newAmountTokenPoints = tokenRange?.tokenPoints || 0;
    const newRedeemedPoints = body.redeemedPoints || 0;

    // update token points
    const updateTokenPoints = await db.customer_token_points.update( // substract previous and add new points
        { points: Sequelize.literal(`points - ${previouisAddedTokenPoints} + ${previousRedeemedPoints} + ${newAmountTokenPoints} - ${newRedeemedPoints}`) },
        { where: { customerId: transactionData.customerId }}
    );
    if(!updateTokenPoints){
        await transaction.rollback();
        throw new BadRequestError("Error While Modifying Transaction Logs.");
    }

    // modify transaction logs
    const modifiedTransaction = await db.transaction_logs.update(
        body,
        {
            where: {
                id: transactionId,
                deletedAt: null
            }
        }
    );
    if(!modifiedTransaction){
        await transaction.rollback();
        throw new BadRequestError("Error While Modifying Transaction Logs.");
    }
    await transaction.commit();
    return { 
        statusCode: 200, 
        message: 'Transaction Data Updated Successfully',
        data: transactionData
    }
}

exports.removeTransaction = async (transactionId) => {
    if(!transactionId){
        throw new BadRequestError("Invalid Transaction Id");
    }
    const transaction = await db.sequelize.transaction();

    // get previous transaction details
    const transactionRecord = await db.transaction_logs.findOne({
        where: {
            id: transactionId,
            deletedAt: null
        }
    });
    if(!transactionRecord){
        await transaction.rollback();
        throw new DataNotFoundError(`Transaction with id ${transactionId} not found.`);
    }

    const previousAmount = transactionRecord.amount;
     // get previous token points
     let tokenRange = await db.token_range.findOne({
        where: {
            startAmount: { [Op.lte]: previousAmount },
            endAmount: { [Op.gte]: previousAmount },
            deletedAt: null
        },
        order: [['startAmount', 'desc']]
    });
    if(!tokenRange){ 
        tokenRange = await db.token_range.findOne({
            where: {
                deletedAt: null
            },
            order: [['startAmount', 'desc']],
            limit: 1
        });
    }
    const previouisAddedTokenPoints = tokenRange?.tokenPoints || 0;
    console.log("transactionRecord, ", transactionRecord.customerId )
    // update customer token points
    const updateTokenPoints = await db.customer_token_points.update( // substract previous and add new points
        { points: Sequelize.literal(`points - ${previouisAddedTokenPoints}`) },
        { where: { customerId: transactionRecord.customerId }}
    );
    if(!updateTokenPoints){
        await transaction.rollback();
        throw new BadRequestError("Error While Modifying Transaction Logs.");
    }

    const deleteTransaction = await db.transaction_logs.update(
        { deletedAt: Date.now() },
        {
            where: {
                id: transactionId,
                deletedAt: null
            }
        }
    );
    if(!deleteTransaction){
        await transaction.rollback();
        throw new BadRequestError("Error while deleting transaction");
    }
    await transaction.commit();
    return { 
        statusCode: 200, 
        message: 'Transaction Deleted Successfully' 
    }
}
const db = require('../models');
const { DataNotFoundError, BadRequestError, ValidationError } = require('../utils/customError');
const { Op, Sequelize } = require('sequelize');

exports.createCustomer = async (body) => {
    const { belongsToHotel, amount } = body;
    const hotelExist = await db.hotel.findOne({
        where: {
            id: belongsToHotel,
            deletedAt: null
        }
    });
    if (!hotelExist) {
        throw new BadRequestError(`Hotel with the id ${belongsToHotel} does not exist`);
    }
    const customerExist = await db.customer.findOne({
        where: {
            mobile: body.mobile,
            belongsToHotel: body.belongsToHotel
        }
    });
    if(customerExist){
        throw new ValidationError(`Customer with mobile number ${body.mobile} `);
    }
    const addCustomer = await db.customer.create(body);
    if (!addCustomer) {
        throw new BadRequestError("Error While Adding Customer");
    }

    // add transaction
    const transactionObject = {
        customerId: addCustomer.id,
        hotelId: belongsToHotel,
        amount,
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
    if (!tokenRange) {  // if amount if greater than every range take maximim range
        tokenRange = await db.token_range.findOne({
            where: {
                deletedAt: null
            },
            order: [['startAmount', 'desc']],
            limit: 1
        });
    }

    // totel token points
    const tokenPoints = (hotelExist?.baseTokenPoints + tokenRange?.tokenPoints) || 0;

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

exports.retriveCustomers = async (query, hotelId) => {
    const whereClause = {
        belongsToHotel: hotelId,
        deletedAt: null
    };
    if (query) {
        if (query.firstName) {
            whereClause.firstName = {
                [Op.like]: `%${query.firstName}%`
            };
        }
        if (query.lastName) {
            whereClause.lastName = {
                [Op.like]: `%${query.lastName}%`
            };
        }
        if (query.mobile) {
            whereClause.mobile = {
                [Op.like]: `%${query.mobile}%`
            };
        }
    }
    const customerData = await db.customer.findAll({
        where: whereClause,
        include: [
            {
                model: db.customer_token_points,
                attributes: ['points']
            }
        ],
        attributes: ['id', 'firstName', "lastName", "mobile", "documents"],
        sort: { updatedAt: -1 }
    });
    return {
        statusCode: 200,
        message: 'Customer Data Fetched Successfully',
        data: customerData
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
    const { customerId, amount } = body;
    const insertTransactionLogs = await db.transaction_logs.create(body);
    if (!insertTransactionLogs) {
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
    if (!tokenRange) {  // if amount if greater than every range take maximim range
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
        { where: { customerId } }
    );

    // sms logic
    if (!updateTokenPoints) {
        throw new BadRequestError("Error While Adding Transaction Logs.");
    }
    return {
        statusCode: 200,
        message: 'Customer Logs Added Successfully'
    };
}

exports.retriveTransactions = async (hotelId) => {
    const transactionData = await db.transaction_logs.findAll({
        where: {
            hotelId,
            deletedAt: null
        },
        include: [
            {
                model: db.customer,
                attributes: ["id","firstName", "lastName", "mobile"]
            }
        ],
        attributes: ["amount", "id"],
        sort: { updatedAt: -1 }
    });
    return { 
        statusCode: 200, 
        message: 'Transaction Data Fetched Successfully',
        data: transactionData
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

    // update token points
    const updateTokenPoints = await db.customer_token_points.update( // substract previous and add new points
        { points: Sequelize.literal(`points - ${previouisAddedTokenPoints} + ${newAmountTokenPoints}`) },
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
        throw new DataNotFoundError(`Transaction with id ${id} not found.`);
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
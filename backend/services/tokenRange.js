const db = require('../models');
const { Op } = require("sequelize");

const { UnauthorizedError, BadRequestError, ValidationError, DataNotFoundError } = require('../utils/customError');

exports.addTokenRange = async (body) => {
    const addTokenRange = await db.token_range.create(body);
    if(!addTokenRange){
        throw new BadRequestError("Error while adding range.");
    }
    return {  
        statusCode: 200, 
        message: 'Range Added Successfully'
    };
}

exports.retriveTokenRange = async (query) => {
    let page = Number(query.page) || 1;
    let limit = Number(query.limit) || 10;
    const skip =  (page - 1) * limit;
    const { hotelId } = query;

    const tokenRanges = await db.token_range.findAll({
        where: {
            hotelId,
            deletedAt: null
        },
        offset: skip,
        limit,
        order: [['startAmount', 'asc']],
        attributes: [ 'startAmount', 'endAmount', 'tokenPoints']
    });
    return {  
        statusCode: 200, 
        message: 'Token Ranges Retrived Successfully',
        data: tokenRanges
    };
}

exports.updateTokenRange = async (id, body) => {
    const rangeRecord = await db.token_range.findOne({
        where: {
            id,
            deletedAt: null
        }
    });
    if(!rangeRecord){
        throw new DataNotFoundError(`range record with id ${id} not found.`);
    }
    const updatedRecord = await db.token_range.update(
        body,
        {
            where: {
                id
            }
        }
    );
    if(!updatedRecord){
        throw new BadRequestError("Error while updating the record")
    }
    return {  
        statusCode: 200, 
        message: 'Range Record Updated Successfully'
    };
}

exports.removeTokenRange = async (id) => {
    if(!id){
        throw new BadRequestError("Invalid Range Id");
    }
    const rangeRecord = await db.token_range.findOne({
        where: {
            id, 
            deletedAt: null
        }
    });
    if(!rangeRecord){
        throw new DataNotFoundError(`range with id ${id} not found`);
    }
    const updateRange = await db.token_range.update(
        { deletedAt: Date.now() },
        { 
            where: {
                id
            }
        }
    );
    if(!updateRange){
        throw new BadRequestError("Error while deleting the record");
    }
    return {  
        statusCode: 200, 
        message: 'Record Deleted Successfully'
    };
}
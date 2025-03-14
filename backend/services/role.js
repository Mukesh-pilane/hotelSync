const db = require('../models');
const { DataNotFoundError, BadRequestError, ValidationError } = require('../utils/customError');

exports.retriveRole = async () => {
    const roles = await db.role.find({
        where: {
            deleteAt: null
        },
        attributes: ["name", "description"]
    })
    
    return { 
        statusCode: 200, 
        message: 'Roles Fetched Successfully',
        data: roles
    }
}
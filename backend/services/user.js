const db = require('../models');
const { DataNotFoundError, BadRequestError } = require('../utils/customError');

exports.createUser = async (body) => {
    const userExist = await db.user.findOne({
        where : {
            email : body.email
        }
    });
    if(userExist){
        throw new BadRequestError(`User with email ${email} altready exist`)
    }
    const insertUser = await db.user.create(body);
    if (!insertUser) {
        throw new BadRequestError('Error while adding user')
    } 
    return { 
        statusCode: 200, 
        message: 'User Added Successfully' 
    }
}

exports.fetchAllUsers = async () => {
    const fetchUsers = await db.user.findAll({
        where: {
            deletedAt: null
        },
        attributes: ["name", "email", "roleId"]
    });
    if (!fetchUsers) {
        throw new DataNotFoundError();
    } 
    return {  
        statusCode: 200, 
        message: 'Users Fetched Successfully',
        data: fetchUsers
    };
}

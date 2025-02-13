const db = require('../models');
const { DataNotFoundError, BadRequestError } = require('../utils/customError');

exports.createUser = async (body) => {
    const userExist = await db.user.findOne({
        where : {
            mobile : body.mobile
        }
    });
    if(userExist){
        throw new BadRequestError(`User with phone number ${body.mobile} altready exist`)
    }
    let res = await db.role.findAll();
    const roleExist = await db.role.findOne({
        where: {
            id: body.roleId
        }
    });
    if(!roleExist){
        throw new BadRequestError("Role Id Is Invalid.")
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
        include:[
            {
                model: db.role,
                attributes: ['name']
            },
            {
                model: db.hotel,
                attributes: ['name']
            }
        ],
        attributes: ["first_name", "last_name", "mobile"]
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

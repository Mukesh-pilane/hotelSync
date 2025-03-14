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

exports.fetchAllUsers = async (query) => {
    let page = Number(query.page) || 1;
    let limit = Number(query.limit) || 10;
    const skip =  (page - 1) * limit;
    const search = query.search || "";

    const whereClause = { 
        ...(search && {
            [Op.or] : [
            { firstName : { [Op.like]: `%${search}%` } },
            { lastName : { [Op.like]: `%${search}%` } },
            { mobile: { [Op.like]: `%${search}%` } }
            ]
        }),
        deletedAt: null,
    }

    const fetchUsers = await db.user.findAndCountAll({
        where: whereClause,
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
        attributes: ["first_name", "last_name", "mobile"],
        offset: skip,
        limit,
        order: [["updatedAt", "desc"]]
    });

    return {  
        statusCode: 200, 
        message: 'Users Fetched Successfully',
        data: fetchUsers
    };
}

exports.modifyUser = async (id, body) => {
    const modifiedCustomer = await db.user.update(
        body,
        {
            where: {
                id: id,
                deletedAt: null
            }
        }
    );
    if(!modifiedCustomer){
        throw new BadRequestError("Error while modifying user");
    }
    return { 
        statusCode: 200, 
        message: 'User Updated Successfully' 
    }
}

exports.deleteUser = async (id) => {
    const modifiedUser = await db.user.update(
        { deletedAt: Date.now() },
        {
            where: {
                id: id,
                deletedAt: null
            }
        }
    );
    if(!modifiedUser){
        throw new BadRequestError("Error while deleting user");
    }
    return { 
        statusCode: 200, 
        message: 'User Deleted Successfully' 
    }
}

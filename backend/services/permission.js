const db = require('../models');
const { DataNotFoundError, BadRequestError, ValidationError } = require('../utils/customError');
const { Op, Sequelize, where } = require('sequelize');

exports.addPermission = async (body) => {
    const addedPermission = await db.permission.create(body);
    if(!addedPermission){
        throw new BadRequestError("Error while adding permission");
    }
    return { 
        statusCode: 200, 
        message: 'Permission Data Added Successfully',
    }
}

exports.retrivePermission = async () => {
    const permissionData = await db.permission.findAll({
        where: {
            deletedAt: null
        },
    });

    return { 
        statusCode: 200, 
        message: 'Permission Data Fetched Successfully',
        data: permissionData
    }
}

exports.updatePermission = async (id, body) => {
    const permissionExist = await db.permission.findOne({
        where: {
            id,
            deletedAt: null
        }
    });
    if(!permissionExist){
        throw new DataNotFoundError(`Permission with id ${id} not found.`);
    }
    await db.permission.update(
        body,
        {
            where: {
                id,
                deletedAt: null
            }
        }
    );
    return { 
        statusCode: 200, 
        message: 'Permission Data Updated Successfully',
    }
}

exports.removePermission = async (id) => {
    const permissionExist = await db.permission.findOne({
        where: {
            id,
            deletedAt: null
        }
    });
    if(!permissionExist){
        throw new DataNotFoundError(`Permission with id ${id} not found.`);
    }
    await db.permission,update(
        { deletedAt: Date.now() },
        { 
            where: {
                id
            }
        }
    );
    return { 
        statusCode: 200, 
        message: 'Permission Data Removed Successfully',
    }
}


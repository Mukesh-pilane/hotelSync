module.exports = async (req, res, next) => {
    const userId = req.userData.id;
    const userRole = await db.user.findOne({
        where : {
            id : userId
        },
        include : [{
            model : db.role,
            as : "role",
            attribudes:["name"]
        }]
    });
    const userPermission = await db.permission.findOne({
        where : {
            baseUrl : req.baseUrl,
            path : req.route.path,
            method : req.method
        }
    });

    if(!userPermission){
        return res.status(401).json({ message: "Permission Not Found "});
    }
    
    const userRolePermission = await db.rolePermission.findOne({
        where : {
            roleId: userRole.roleId,
            permissionId : userPermission.id
        }
    });

    if(!userRolePermission){
        return res.status(401).json({ message: "You Don't Have Permission To This."});
    }
    next();
};

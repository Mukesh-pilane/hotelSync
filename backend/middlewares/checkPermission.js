module.exports = async (req, res, next) => {
    const roleId = req.userData.role;

    const userPermission = await db.permission.findOne({
        where : {
            baseUrl : req.baseUrl,
            path : req.route.path,
            method : req.method,
            deletedAt: null
        }
    });
    if(!userPermission){
        return res.status(401).json({ message: "Permission Not Found "});
    }

    const rolerPermission = db.role_permission.findOne({
        where: {
            roleId,
            permissionId: userPermission.id,
            deletedAt: null
        }
    });
    if(!rolerPermission){
        return res.status(401).json({ message: "You Don't Have Permission To This."});
    }
    next();
};

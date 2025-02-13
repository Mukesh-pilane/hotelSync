module.exports = (sequelize, DataTypes) => {
    const rolePermission = sequelize.define('role_permission',{
        roleId: {
            type: DataTypes.INTEGER,
            field: 'role_id',
            allowNull: false,
        },
        permissionId: {
            type: DataTypes.INTEGER,
            field: 'permission_id',
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at',
            default: null,
        },
    },{
        tablename: 'role_permission',
        paranoid : true, 
        timestamps: true 
    });

    rolePermission.associate = (models) => {
        rolePermission.belongsTo(models.permission, { foreignKey: 'permission_id', as:'permission' });
        rolePermission.belongsTo(models.role, { foreignKey: 'role_id', as: 'role' });
    }

    return rolePermission;
}

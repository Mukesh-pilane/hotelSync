module.exports = (sequelize, DataTypes) => {
    const permission = sequelize.define('permission',{
        actionName: {
            type: DataTypes.STRING,
            field: 'action_name',
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        baseUrl: {
            type: DataTypes.STRING,
            filed: 'base_url',
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at',
            default: null,
        },
    },{
        paranoid : true, 
        timestamps: true,
        underscored: true,
    });

    permission.associate = (models) => {
        permission.belongsToMany(models.role, { through: models.role_permission });
    }

    return permission;
}

module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define('role',{
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        }
    },{
        paranoid : true,
        underscored: true,
    });
    role.associate = (models) => {
        role.hasOne(models.user, { foreignkey : "role_id"} );
        role.belongsToMany(models.permission, { through : models.role_permission });
    }
    return role;
}

module.exports = (sequelize, DataTypes) => {
    const userToken = sequelize.define('user_token', {
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        field: 'token',
        allowNull: false,
      },
    }, 
    {
      freezeTableName: true,
      underscored: true,
      tableName: 'user_token',
      paranoid: true
    });

    userToken.associate = (models) => {
      userToken.belongsTo(models.user, { foreignKey: 'user_id', as: 'user'});
    };

    return userToken;
};

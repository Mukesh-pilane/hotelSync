module.exports = (sequelize, DataTypes) => {
    const customerTokenPoints = sequelize.define('customer_token_points', {
      userId: {
        type: DataTypes.INTEGER,
        field: 'customer_id',
        allowNull: false,
      },
      hotelId: {
        type: DataTypes.INTEGER,
        field: 'hotel_id',
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        field: 'points',
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, 
    {
      paranoid: true,
      underscored: true,
      tableName: 'customer_token_points',
    });

    customerTokenPoints.associate = (models) => {
      customerTokenPoints.belongsTo(models.customer, { foreignKey: 'customer_id'});
      customerTokenPoints.belongsTo(models.hotel, { foreignKey: 'hotel_id' } );
    };

    return customerTokenPoints;
};
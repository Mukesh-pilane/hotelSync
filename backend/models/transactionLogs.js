module.exports = (sequelize, DataTypes) => {
    const transactionLogs = sequelize.define('transaction_logs', {
      customerId: {
        type: DataTypes.INTEGER,
        field: 'customer_id',
        allowNull: false,
      },
      hotelId: {
        type: DataTypes.INTEGER,
        field: 'hotel_id',
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        field: 'amount',
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
      tableName: 'transaction_logs',
    });

    transactionLogs.associate = (models) => {
        transactionLogs.belongsTo(models.customer, { foreignKey: 'customer_id'});
        transactionLogs.belongsTo(models.hotel, { foreignKey: 'hotel_id' } );
    };

    return transactionLogs;
};
module.exports = (sequelize, DataTypes) => {
    const customer = sequelize.define('customer',{
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name',
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name',
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
            field: 'mobile',
            allowNull: false,
        },
        belongsToHotel : {
            type: DataTypes.INTEGER,
            filed: 'hotel_id',
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            filed: 'created_by',
            allowNull: false,
        },
        documents : {
            type: DataTypes.ARRAY(DataTypes.STRING), 
            filed: 'documents',
            allowNull: true,
        },
        deletedAt:{
            type: DataTypes.DATE,
            field: 'deleted_at',
            default: null
        }
    },{
        indexes: [
            {
              name: 'unique_mobile_number_on_same_hotel',
              unique: true,
              fields: ['mobile', 'hotel_id'],
              where: {
                deleted_at: null, // Ensure uniqueness for hotel and user,
              },
            },
          ],
        paranoid : true,
        underscored: true,
    });
    customer.associate = (models) => {
        customer.belongsTo(models.hotel, { foreignKey: 'hotel_id'} );
        customer.hasOne(models.customer_token_points, { foreignKey: 'customer_id' });
        customer.belongsTo(models.user, { foreignKey: 'created_by'})
    }
    return customer;
}
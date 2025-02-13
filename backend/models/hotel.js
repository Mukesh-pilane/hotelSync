module.exports = (sequelize, DataTypes) => {
    const hotel = sequelize.define('hotel',{
        name: {
            type: DataTypes.STRING,
            require: true
        },
        address: {
            type: DataTypes.STRING,
            require: true
        },
        baseTokenPoints: {
            type: DataTypes.INTEGER,
            require: false,
            default: 0
        },
        deletedAt:{
            type: DataTypes.DATE,
            field: 'deleted_at',
            default: null
        }
    },{
        paranoid : true,
        underscored: true,
    });
    hotel.associate = (models) => {
        hotel.hasOne(models.user, { foreignkey : "hotel_id"} );
        hotel.hasOne(models.customer_token_points, { foreignkey: 'hotel_id' });
        hotel.hasOne(models.token_range, { foreignkey: 'hotel_id' });
    }
    return hotel;
}